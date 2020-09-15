import React, { useEffect, useState } from 'react'
import { MenuItem, SubMenu } from 'react-pro-sidebar'
import { Label, Input, Row, Col } from 'reactstrap'
import './FeatureList.css' 
 
const FeatureList = props => {

    const formatName = (name, size) => {
        return name.length > size ? name.substring(0, size) + '...' : name
    }

    return (
        <>
            <div className='FeatureList'>
                {props.features.map((f) => {                        
                    return f.items 
                    ? 
                        <SubMenu title={f.name} key={f.name}>
                            {f.items.map((i) => {
                                return (
                                    <MenuItem key={i.id} onClick={() => props.change(f, i)}>
                                        <Row>
                                            <Col xs="8">
                                                <span>{formatName(i.name, 16)}</span>
                                            </Col>
                                            <Col>
                                                <Input type="checkbox" checked={i.selected} readOnly />
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
                                    <Input type="checkbox" checked={f.selected} readOnly />
                                </Col>
                            </Row>
                        </MenuItem>                                                                              
                })}                            
            </div>
        </>
    )
}

export default FeatureList