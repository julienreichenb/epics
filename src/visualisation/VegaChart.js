import React, { forwardRef, useEffect, useState, useImperativeHandle } from 'react'
import { Col, Row } from 'reactstrap'
import { Vega, VegaLite } from 'react-vega'
import { Handler } from 'vega-tooltip'
import ClusterOptions from './ClusterOptions'
import clustering from '../services/clustering'
import './VegaChart.scss'

const VegaChart = (props, ref) => {
    const [clusterNumber, setClusterNumber] = useState(0)
    const [patientCollection, setPatientCollection] = useState(null)
    const [collectionLoaded, setCollectionLoaded] = useState(false)
    const [clusterSpec, setClusterSpec] = useState(null)

    useEffect(() => {
        setClusterSpec(props.chart.spec)
        if (props.clusterable) computePatientCollection()
    }, [props.chart])

    useEffect(() => {
        if (patientCollection) setCollectionLoaded(true)
    }, [patientCollection])

    useEffect(() => {
        if (!props.clusterable || !clusterSpec) return
        if (!clusterNumber || clusterNumber === 0) {
            clusterSpec.vconcat.map((v) => {
                v.encoding.x.sort = "ascending"
            })
            setClusterSpec({ ...clusterSpec })
            return
        }
        const data = patientCollection.map((p) => {
            return p.values
        })
        const clusters = clustering.getClusters(data, clusterNumber)
        const order = getNewOrder(clusters)
        clusterSpec.vconcat.map((v) => {
            v.encoding.x.sort = order
        })
        setClusterSpec({ ...clusterSpec })
        props.reloadImages()
    }, [clusterNumber])

    const getNewOrder = (clusters) => {
        const indexOrder = []
        clusters.map((c) => {
            c.map((i) => {
                indexOrder.push(computeIndex(i[0]))
            })
        })
        const orderedPatients = indexToIds(indexOrder)
        return orderedPatients
    }

    const indexToIds = (orderArray) => {
        const newOrder = []
        orderArray.map((o) => {
            const next = patientCollection.find((p) => p.index === o)
            newOrder.push(next.id)
        })
        return newOrder
    }

    const computePatientCollection = () => {
        const patients = [...new Set(props.chart.data.status.map(f => f.PatientID))]
        const temp = []
        let index = 0.00001
        patients.map((p) => {
            const featuresCollection = props.chart.data.features.filter((x) => x.PatientID === p)
                .sort((a, b) => a.feature_id.localeCompare(b.feature_id))
                .map((f) => f.feature_value)
            featuresCollection.unshift(index)
            temp.push({
                id: p,
                index: computeIndex(index),
                values: featuresCollection,
            })
            index += 0.00001
        })
        setPatientCollection(temp)
    }

    const computeIndex = (i) => {
        return (i * 100000).toFixed(0)
    }

    const update = (number) => {
        setClusterNumber(number)
    }

    const show = (err) => {
        console.log(err)
    }

    useImperativeHandle(ref, () => ({
        getChart(id) {
            return document.getElementById(id).getElementsByTagName('canvas')[0].toDataURL()
        }
      }));

    return (
        <>
            <div className='VegaChart'>
                <h4>
                    <Row noGutters>
                        <Col className='my-auto'>
                            {props.title}
                        </Col>
                        {props.clusterable &&
                            <ClusterOptions save={update} loaded={collectionLoaded} />
                        }
                    </Row>
                </h4>
                {props.type === 'vega' && clusterSpec
                ? <Vega spec={clusterSpec} data={props.chart.data} />
                : props.type === 'vega-lite' && clusterSpec
                ? <VegaLite spec={clusterSpec} data={props.chart.data} onParseError={show} tooltip={new Handler().call} />    
                : <h5>Graphique inconnu</h5>
                }   
            </div>                                       
        </>
    )
}

export default forwardRef(VegaChart)
