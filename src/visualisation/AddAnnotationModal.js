import React, { useEffect, useRef } from 'react'
import { Button, ButtonGroup, Modal, ModalHeader, ModalBody, ModalFooter, Input, Label, Form, FormGroup, FormFeedback } from 'reactstrap'
import { FaRegSave } from 'react-icons/fa'
import { withFormik } from 'formik'
import * as Yup from 'yup'
import './AddAnnotationModal.css'
import CanvasDraw from 'react-canvas-draw'
import Img from '../assets/img/cat.jpg'

const AddAnnotationModal = props => {
    const drawEl = useRef(null)

    useEffect(() => {
        if (props.annotation) {
            props.setFieldValue('title', props.annotation.title)
            props.setFieldValue('text', props.annotation.text)
            if (props.annotation.lines && props.annotation.lines.length > 0) {
                props.setFieldValue('lines', props.annotation.lines)
                // 
                setTimeout(() => {
                    drawEl.current.lines = props.annotation.lines   
                    // console.log(drawEl.current)                    
                }, 300)
            }
        }
    }, [props.annotation, drawEl])

    const submit = () => {
        props.handleSubmit(props.values, props)
        setTimeout(() => {
            props.toggle()
        }, 500)
    }

    const toggle = () => {
        props.resetForm()
        props.toggle()
    }

    const getLines = () => {
        props.setFieldValue('lines', [...drawEl.current.lines])
    }

    return (
        <>
            <Modal id='annotModal' size='lg' centered isOpen={props.show} toggle={toggle}>
                <ModalHeader toggle={toggle}>
                    {props.annotation ? "Modifier l'annotation" : 'Participer à la discussion'}
                </ModalHeader>
                <ModalBody>
                    <Form>
                        <FormGroup>
                            <Label for="title">Titre</Label>
                            <Input type="text" 
                                name="title" 
                                id="title" 
                                placeholder="Titre de votre annotation..." 
                                value={props.values.title}
                                onChange={props.handleChange} 
                                onBlur={props.handleBlur}          
                                invalid={props.touched.title && props.errors.title ? true : false}               
                            />
                            <FormFeedback invalid={props.touched.title && props.errors.title ? props.errors.title : null}>{props.errors.title}</FormFeedback>
                        </FormGroup>
                        <FormGroup>
                            <Label for="text">Annotation</Label>
                            <Input type="textarea" 
                                rows='8' 
                                name="text" 
                                id="text" 
                                placeholder="Observations, remarques, commentaires, ..." 
                                value={props.values.text}
                                onChange={props.handleChange} 
                                onBlur={props.handleBlur}
                                invalid={props.touched.text && props.errors.text ? true : false}
                            />                    
                            <FormFeedback invalid={props.touched.text && props.errors.text ? props.errors.text : null}>{props.errors.text}</FormFeedback>                            
                        </FormGroup>
                    </Form>
                    <ButtonGroup>
                        <Button onClick={() => drawEl.current.clear()}>Clear</Button>
                    </ButtonGroup>
                    <CanvasDraw ref={drawEl} brushRadius={3} imgSrc={Img} onChange={getLines} className='mx-auto' />
                </ModalBody>
                <ModalFooter>
                    {props.annotation
                    ?
                    <Button color="dark" onClick={submit}>
                        <FaRegSave className='mr-2' /> Modifier
                    </Button>
                    :
                    <Button color="success" onClick={submit}>
                        <FaRegSave className='mr-2' /> Sauvegarder
                    </Button>
                    }                    
                    <Button color="secondary" onClick={toggle}>
                        Annuler
                    </Button>
                </ModalFooter>
            </Modal>
        </>
    )
}

export default withFormik({
    mapPropsToValues: () => ({
        title: '',
        text: '',
        lines: null,
    }),
    validationSchema: Yup.object().shape({
        title: Yup.string()
                    .min(5, 'Le titre doit contenir au moins 5 caractères.')
                    .max(30, 'Le titre ne doit pas dépasser 60 caractères.')
                    .required("Vous devez donner un titre à l'annotation."),
        text: Yup.string()
                    .required('Veuillez préciser votre annotation.'),        
    }),
    handleSubmit: (values, {props}) => {
        props.save(values.title, values.text, values.lines, props.parentId)
    },
})(AddAnnotationModal)