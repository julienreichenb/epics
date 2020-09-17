import React, { useEffect, useState } from 'react'
import { ProSidebar, Menu, SidebarHeader, SidebarContent } from 'react-pro-sidebar'
import { FaComments, FaEyeSlash, FaPlus } from 'react-icons/fa'
import { Row, Col, Button } from 'reactstrap'
import Loading from './Loading'
import AnnotationList from './AnnotationList'
import AddAnnotationModal from './AddAnnotationModal'
import './AnnotationPanel.scss'

const AnnotationPanel = props => {
    const [collapsed, setCollapsed] = useState(false)
    const [showModal, setShowModal] = useState(false)

    const saveAnnotation = (title, text, parentId) => {
        setShowModal(false)
        props.saveAnnotation(title, text, parentId)
    }

    return (
        <>
            <ProSidebar collapsed={collapsed} className='AnnotationPanel' onClick={() => collapsed && setCollapsed(false)}>
                <SidebarHeader className='SidePanelHeader'>
                    <Row>
                        <Col xs="7">
                            <h5><FaComments className="mr-2" />{!collapsed && 'Discussions'}</h5>         
                        </Col>
                        {!collapsed &&
                        <Col className='text-right'>
                            <Button className='mr-4' color='success' onClick={() => setShowModal(true)}>
                                <FaPlus className='mr-2'/>Commenter
                            </Button>
                            <Button color="light" onClick={() => setCollapsed(!collapsed)}>
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
                        <AnnotationList annotations={props.annotations} collapsed={collapsed} saveAnnotation={saveAnnotation} />
                    </Menu>}                                 
                </SidebarContent>  
                <AddAnnotationModal show={showModal} toggle={() => setShowModal(false)} save={saveAnnotation} />
            </ProSidebar>
        </>
    )
}

export default AnnotationPanel