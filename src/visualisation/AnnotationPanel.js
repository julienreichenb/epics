import React, { useEffect, useState } from 'react'
import { ProSidebar, Menu, SidebarHeader, SidebarContent } from 'react-pro-sidebar'
import { FaComments, FaEyeSlash } from 'react-icons/fa'
import { Row, Col, Button } from 'reactstrap'
import Loading from './Loading'
import AnnotationList from './AnnotationList'
import moment from 'moment'
import './AnnotationPanel.scss'

const AnnotationPanel = props => {
    const [collapsed, setCollapsed] = useState(false)
    return (
        <>
            <ProSidebar collapsed={collapsed} className='AnnotationPanel' onClick={() => collapsed && setCollapsed(false)}>
                <SidebarHeader className='SidePanelHeader'>
                    <Row>
                        <Col xs="9">
                            <h5><FaComments className="mr-2" />{!collapsed && 'Discussions'}</h5>         
                        </Col>
                        {!collapsed &&
                        <Col>
                            <Button color="light" size="sm" className="pb-2" onClick={() => setCollapsed(!collapsed)}>
                                <FaEyeSlash />
                            </Button>
                        </Col>
                        }                        
                    </Row>
                </SidebarHeader>
                <SidebarContent className='SidePanelContent'>
                    {props.loading
                    ? <Loading color="info" size="sm"><small>Chargement des annotations...</small></Loading>
                    : props.annotations.length === 0
                    ? <h5>Aucune annotation pour le moment.</h5>
                    : <Menu iconShape='circle'>
                        <AnnotationList annotations={props.annotations} collapsed={collapsed} />
                    </Menu>}             
                </SidebarContent>  
            </ProSidebar>
            <div>
                
            </div>
        </>
    )
}

export default AnnotationPanel