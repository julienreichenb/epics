import React from 'react'
import { ProSidebar, Menu, SidebarHeader, SidebarContent } from 'react-pro-sidebar'
import { FaCheckDouble, FaBan, FaFlask } from 'react-icons/fa'
import { Button, ButtonGroup } from 'reactstrap'
import FeatureList from './FeatureList'
import Loading from './Loading'
import './SidePanel.scss' 

const SidePanel = props => {
    return (
        <>
            <ProSidebar className='SidePanel'>
                <SidebarHeader className='SidePanelHeader'>
                    <h5><FaFlask className="mr-2" />Features</h5>         
                    <small>({props.features && props.features.length && props.selectedCpt} sélectionnées)</small>
                    <ButtonGroup>
                        <Button disabled={props.features.length === 0} color="success" size="sm" onClick={() => props.all(true)}>
                            Tout <FaCheckDouble color="white" />
                        </Button>
                        <Button disabled={props.features.length === 0} color="danger" size="sm" onClick={() => props.all(false)}>
                            Aucun <FaBan color="white" />
                        </Button>
                    </ButtonGroup>         
                </SidebarHeader>
                <SidebarContent className='SidePanelContent'>
                    {props.features ?  
                    <Menu>
                        <FeatureList 
                            features={props.features}  
                            regions={props.regions}
                            modalities={props.modalities}
                            change={props.change}                        
                            forceChange={props.change}                        
                        />                
                    </Menu>
                    : <Loading color="info" />}               
                </SidebarContent>               
            </ProSidebar>
        </>
    )
}

export default SidePanel