import React, { useEffect, useState } from 'react'
import { ProSidebar, Menu, SidebarHeader, SidebarContent } from 'react-pro-sidebar'
import { FaCheckDouble, FaBan, FaFlask } from 'react-icons/fa'
import { Button, ButtonGroup, Row, Col } from 'reactstrap'
import FeatureList from './FeatureList'
import Loading from './Loading'
import './SidePanel.scss' 

const SidePanel = props => {
    return (
        <>
            <ProSidebar className='SidePanel'>
                <SidebarHeader className='SidePanelHeader'>
                    <h5><FaFlask className="mr-2" />Features</h5>         
                    <ButtonGroup>
                        <Button color="success" size="sm" onClick={() => props.all(true)}>
                            Tout <FaCheckDouble color="white" />
                        </Button>
                        <Button color="danger" size="sm" onClick={() => props.all(false)}>
                            Aucun <FaBan color="white" />
                        </Button>
                    </ButtonGroup>         
                </SidebarHeader>
                <SidebarContent className='SidePanelContent'>
                    {props.features.length ?  
                    <Menu>
                        <FeatureList features={props.features} change={props.change} />                
                    </Menu>
                    : <Loading color="info" />}               
                </SidebarContent>               
            </ProSidebar>
        </>
    )
}

export default SidePanel