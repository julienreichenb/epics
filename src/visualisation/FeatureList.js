import React, { useState, useEffect } from 'react'
import { MenuItem, SubMenu } from 'react-pro-sidebar'
import { Row, Col, Button, ButtonGroup } from 'reactstrap'
import { FaBan, FaCheckDouble, FaCheck, FaTimes } from 'react-icons/fa'
import './FeatureList.scss' 
 
const FeatureList = props => {
    const [parentFeatures, setParentFeatures] = useState([])

    const green = '#75BD4B'
    const red = '#F0706A'

    // Prepare Features display
    useEffect(() => {
        let features = []
        props.modalities.map((m) => {
            props.regions.map((r) => {
                const modality = {
                    name: m + '-' + r,
                    items: [],
                }
                features.push(modality)
            })
        })
        props.features.map((f) => {
            const modality = f.key.split('-')[0]
            const region = f.key.split('-')[1].split('_')[0]
            const name = f.key.split('-')[1].split('_').slice(1).join(' ')
            const feature = {
                key: f.key,
                name,
                selected: f.selected,
            }
            features.map((i) => {
                if (i.name === modality + '-' + region) i.items.push(feature)
            })
        })
        setParentFeatures(features)
    }, [props.features, props.regions, props.modalities])

    const bulkSelect = (feature, selected) => {
        feature.items.map((i) => {
            props.forceChange(i, selected)
        })
    }

    const formatName = (name, size) => {
        return name.length > size ? name.substring(0, size) + '...' : name
    }

    return (
        <>
            <div className='FeatureList'>
                {parentFeatures.map((f) => {                        
                    return f.items 
                    ? 
                        <SubMenu 
                            title={f.name} 
                            key={f.key} 
                            className="SidePanelSubMenu"
                        >
                            <MenuItem className='text-center bg-light'>
                                <ButtonGroup size='sm'>
                                    <Button color='success' onClick={() => bulkSelect(f, true)}>
                                        Tous
                                    </Button>
                                    <Button color='danger' onClick={() => bulkSelect(f, false)}>
                                        Aucun
                                    </Button>
                                </ButtonGroup>        
                            </MenuItem>
                            {f.items.map((i) => {
                                return (
                                    {/* Manage bulk select / deselect */},                         
                                    <MenuItem key={i.id} onClick={() => props.change(i)} className="SidePanelItem">
                                        <Row>
                                            <Col xs="8">
                                                <span className={i.selected ? 'selected' : ''}>{formatName(i.name, 16)}</span>
                                            </Col>
                                            <Col style={{textAlign: 'right'}}>
                                            {i.selected ? <FaCheck color={green} /> : <FaTimes color={red} />}
                                            </Col>
                                        </Row>
                                    </MenuItem>
                                )
                            })}
                        </SubMenu>
                    :                      
                        <MenuItem key={f.key} onClick={() => props.change(f)} className="SidePanelItem">                                        
                             <Row>
                                <Col xs="8">
                                    <span className={f.selected ? 'selected' : ''}>{formatName(f.name, 16)}</span>
                                </Col>
                                <Col style={{textAlign: 'right'}}>
                                    {f.selected ? <FaCheck color={green} /> : <FaTimes color={red} />}
                                </Col>
                            </Row>
                        </MenuItem>                                                                              
                })}                            
            </div>
        </>
    )
}

export default FeatureList