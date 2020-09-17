import React, { useEffect, useState } from 'react'
import { FaComment, FaUser, FaReply } from 'react-icons/fa'
import './AnnotationList.scss'
import { SubMenu } from 'react-pro-sidebar'
import { Row, Col, Badge, Button } from 'reactstrap'
import AddAnnotationModal from './AddAnnotationModal'
import moment from 'moment'

const AnnotationList = props => {
    const [parentAnnotations, setParentAnnotations] = useState([])
    const [showModal, setShowModal] = useState(false)

    const saveAnnotation = (title, text, parentId) => {
        setShowModal(false)
        props.saveAnnotation(title, text, parentId)
    }

    // Prepare annotations
    useEffect(() => {
        let annots = []
        props.annotations.map((a) => {
            const annot = {
                id: a.id,
                user: a.user,
                title: a.title,
                text: a.text,
                date: a.date,
            }
            if(!a.parentId) {
                annot.answers = []
                annots.push(annot)
            } else {
                annots.find((x) => x.id === a.parentId).answers.push(annot)
            }
        })
        annots = sortByDate(annots)
        annots.map((a) => {
            a.answers = sortByDate(a.answers)
        })
        setParentAnnotations(annots)
    }, [props.annotations])

    const sortByDate = (list) => {
        return list.sort((a, b) => {
            return b.date - a.date
        })
    }

    const annotationTitle = (annot) => {
        const date = moment(annot.date).format('D.MM.YYYY à hh:mm:ss')
        return (
            <div className='py-2'>
                <Row>
                    <Col>
                        <span>{annot.title.length > 50 ? annot.title.substring(0, 50) + '...' : annot.title}</span>
                    </Col>                    
                </Row>
                <Row className='text-muted'>
                    <Col xs='5'>
                        <small className={annot.answers && 'parent-small'}>
                            le {date}
                        </small>
                    </Col>
                    <Col>
                        <small className={annot.answers && 'parent-small'}>
                            <FaUser className='mr-2' />{annot.user}
                        </small>
                    </Col>
                    {annot.answers &&
                    <Col xs='3'>
                        <Badge color={annot.answers.length ? 'danger' : 'secondary'}>
                            {annot.answers.length ? annot.answers.length : 0} 
                            {annot.answers.length > 1 ? ' réponses' : ' réponse'}
                        </Badge>
                    </Col>
                    }                    
                </Row>
            </div>
           
        )
    }

    return (
        <>
            {parentAnnotations.map((a) => {
                return (
                    <SubMenu 
                        key={a.id} 
                        className='SidePanelSubMenu' 
                        icon={<FaComment />} 
                        title={!props.collapsed && annotationTitle(a)}
                    >
                        <div className="SidePanelItem p-3">
                            {a.text}
                            <div className='text-right'>
                                <Button color='primary' size='sm' onClick={() => setShowModal(true)}>
                                    <FaReply className='mr-2' />Répondre
                                </Button>
                            </div>
                        </div>                        
                        {a.answers.map((x) => {
                            return (
                                <SubMenu 
                                    key={x.id} 
                                    className='SidePanelSubMenu' 
                                    title={!props.collapsed && annotationTitle(x)}
                                >
                                    <div className="SidePanelItem py-2 px-3">
                                        {x.text}
                                    </div>
                                </SubMenu>
                            )
                        })}
                    <AddAnnotationModal show={showModal} toggle={() => setShowModal(false)} save={saveAnnotation} parentId={a.id} />
                    </SubMenu>
                )
            })}
        </>
    )
}

export default AnnotationList   