import React, { useRef, forwardRef, useImperativeHandle } from 'react'
import VegaChart from './VegaChart'
import Loading from './Loading'
import './Main.css' 

const Main = (props, ref) => {
    const pca = useRef(null)
    const lasagna = useRef(null)

    useImperativeHandle(ref, () => ({
        getChart(type) {
            switch(type) {
                case 'pca':
                    return pca.current.getChart()
                case 'lasagna':
                    // return lasagna.current.getChart()
                default:
                    return
            }
        }
      }));

    return (
        <>
            <div id='main' className='Main'>                
                {props.loading 
                ? <Loading color="dark">
                    <h3>Chargement des graphiques...</h3>                
                </Loading>
                : <>                        
                    <VegaChart ref={lasagna} title={'Radiomics Heatmap'} chart={props.lasagna} type='vega-lite' />
                    <VegaChart ref={pca} title={'Principle Component Analysis'} chart={props.pca} type='vega' />
                </>
                }
            </div>
        </>
    )
}

export default forwardRef(Main)