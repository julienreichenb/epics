import React, { useEffect, useState } from 'react'
import { MenuItem, SubMenu } from 'react-pro-sidebar'
import { Row, Col } from 'reactstrap'
import { FaCheck, FaTimes } from 'react-icons/fa'
import './FeatureList.scss' 
 
const FeatureList = props => {

    const green = '#75BD4B'
    const red = '#F0706A'

    const formatName = (name, size) => {
        return name.length > size ? name.substring(0, size) + '...' : name
    }

    return (
        <>
            <div className='FeatureList'>
                {props.features.map((f) => {                        
                    return f.items 
                    ? 
                        <SubMenu title={f.name} key={f.name} className="SidePanelSubMenu">
                            {f.items.map((i) => {
                                return (
                                    {/* Manage bulk select / deselect */},                         
                                    <MenuItem key={i.id} onClick={() => props.change(f, i)} className="SidePanelItem">
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
                        <MenuItem key={f.name} onClick={() => props.change(null, f)} className="SidePanelItem">                                        
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