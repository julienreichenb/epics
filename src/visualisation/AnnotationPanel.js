import React, { useEffect, useState } from 'react'
import { ProSidebar, Menu, SidebarHeader, SidebarContent } from 'react-pro-sidebar'
import { FaComments, FaEyeSlash, FaPlus } from 'react-icons/fa'
import { Row, Col, Button } from 'reactstrap'
import Loading from './Loading'
import AnnotationList from './AnnotationList'
import AddAnnotationModal from './AddAnnotationModal'
import DeleteAnnotationModal from './DeleteAnnotationModal'
import './AnnotationPanel.scss'

const AnnotationPanel = props => {
    const [collapsed, setCollapsed] = useState(false)
    const [showSaveModal, setShowSaveModal] = useState(false)
    const [showDeleteModal, setShowDeleteModal] = useState(false)
    const [parentId, setParentId] = useState(null)
    const [editingAnnotation, setEditingAnnotation] = useState(null)
    const [deletingAnnotation, setDeletingAnnotation] = useState(null)

    const answerAnnotation = (parentId) => {
        setEditingAnnotation(null)
        setParentId(parentId)
        setShowSaveModal(true)
    }

    const askEditAnnotation = (a) => {
        setEditingAnnotation(a)
        setShowSaveModal(true)
    }

    const saveAnnotation = (title, text) => {
        setShowSaveModal(false)
        setEditingAnnotation(null)
        props.saveAnnotation(title, text, parentId, editingAnnotation)
    }

    const askDeleteAnnotation = (a) => {
        setDeletingAnnotation(a)
        setShowDeleteModal(true)
    }

    const deleteAnnotation = () => {
        setShowDeleteModal(false)
        props.deleteAnnotation(deletingAnnotation.id)
        setDeletingAnnotation(null)
    }

    const cleanSaveModal = () => {
        setShowSaveModal(false)
        setParentId(null)
        setEditingAnnotation(null)
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
                            <Button className='mr-4' color='success' onClick={() => setShowSaveModal(true)}>
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
                        <AnnotationList 
                            annotations={props.annotations} 
                            collapsed={collapsed} 
                            answerAnnotation={answerAnnotation} 
                            editAnnotation={askEditAnnotation}
                            deleteAnnotation={askDeleteAnnotation}
                        />
                    </Menu>}                                 
                </SidebarContent>  
                <AddAnnotationModal 
                    show={showSaveModal} 
                    toggle={() => cleanSaveModal()}
                    annotation={editingAnnotation}
                    save={saveAnnotation}
                />
                <DeleteAnnotationModal 
                    show={showDeleteModal} 
                    toggle={() => setShowDeleteModal(false)} 
                    delete={deleteAnnotation}
                    annotation={deletingAnnotation} 
                />
            </ProSidebar>
        </>
    )
}

export default AnnotationPanel