import React, { useEffect, useState } from 'react'
import './SidePanel.scss' 
import { ProSidebar, Menu, SidebarHeader, SidebarContent } from 'react-pro-sidebar'
import FeatureList from './FeatureList'
import Loading from './Loading'

const SidePanel = props => {
    return (
        <>
            <ProSidebar className='SidePanel'>
                <SidebarHeader className='SidePanelHeader'>
                    Sélection des features
                </SidebarHeader>
                <SidebarContent>
                    {props.features.length ?  
                    <Menu>
                        <FeatureList features={props.features} change={props.change} />                
                    </Menu>
                    : <Loading color={'lightskyblue'} />}               
                </SidebarContent>
               
            </ProSidebar>
        </>
    )
}

export default SidePanel