import React, { useEffect } from 'react'
import { Card, CardBody, CardHeader, Button, ButtonGroup, Badge } from 'reactstrap'
import { FaTimes, FaTrashAlt, FaEdit, FaUser } from 'react-icons/fa'
import './DisplayedAnnotation.scss'
import useDynamicRefs from 'use-dynamic-refs';
import moment from 'moment'
import CanvasDraw from 'react-canvas-draw'

const DisplayedAnnotation = props => {
    const [getRef, setRef] =  useDynamicRefs();

    useEffect(() => {
        if (props.annotation && props.annotation.lines)
            redraw()
    }, [props.annotation])

    const redraw = () => {
        props.images.map((i) => {
            setTimeout(() => {
                getRef(i.id).current.loadSaveData(props.annotation.lines, true)                
            }, 100)
        })
        
    }

    const deleteAnnotation = () => {
        props.delete()
    }

    const editAnnotation = () => {
        props.edit()
    }

    const date = moment(props.annotation.date).format('D.MM.YYYY à hh:mm:ss')

    return (
        <>
            <div className='w-100 text-left displayed-annotation'>
                <Card className='mb-4'>
                    <CardHeader>
                        <div className='d-flex justify-content-between'>
                            <h3>{props.annotation.title}</h3>
                            <div>
                                <Badge color={props.annotation.answers.length > 0 ? 'warning' : 'secondary'} className='mr-2'>
                                    {props.annotation.answers.length} {props.annotation.answers.length > 1 ? 'réponses' : 'réponse'}                                    
                                </Badge>
                                {/* Check if user owns the annotation or if is admin */      
                                <ButtonGroup className='mr-2'>                      
                                    <Button color='danger' onClick={() => deleteAnnotation()}>
                                        <FaTrashAlt />
                                    </Button>
                                    <Button color='dark' onClick={() => editAnnotation()}>
                                        <FaEdit />
                                    </Button>
                                </ButtonGroup>
                                }
                                <Button color='info' onClick={props.close}>
                                    <FaTimes className='mr-1 mb-1' />Fermer
                                </Button>
                            </div>             
                        </div>                 
                    </CardHeader>
                    <CardBody>
                        <div className='text-right mb-4'>
                            <span className='text-muted'>
                                Posté par 
                                <span className='text-danger'>
                                    <FaUser className='ml-2 mr-1' />
                                    {props.annotation.user}
                                </span>, 
                                le {date}
                            </span>    
                        </div>                         
                        <p>{props.annotation.text}</p>
                    </CardBody>
                </Card> 
                {props.images.length > 0 && props.images.map((image, index) => {
                    return (
                        <CanvasDraw
                            key={index}
                            ref={setRef(image.id)}
                            imgSrc={image.raw} 
                            disabled
                            className='mx-auto' 
                            style={{width: image.width, height: image.height}}
                        />
                    )
                })}
            </div>
        </>
    )
}

export default DisplayedAnnotation