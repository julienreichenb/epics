import React, { useEffect, useState } from 'react'
import { Button, Modal, ModalHeader, ModalBody, ModalFooter, Input, Label, Form, FormGroup, FormFeedback } from 'reactstrap'
import { FaRegSave } from 'react-icons/fa'
import {withFormik} from 'formik'
import * as Yup from 'yup'
import './AddAnnotationModal.css'
import AnnotationList from './AnnotationList'

const AddAnnotationModal = props => {

    return (
        <>
            <Modal size='lg' centered isOpen={props.show} toggle={props.toggle}>
                <ModalHeader toggle={props.toggle}>Participer à la discussion</ModalHeader>
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
                                invalid={props.touched.title && props.errors.title}               
                            />
                            <FormFeedback invalid={props.touched.title && props.errors.title}>{props.errors.title}</FormFeedback>
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
                                invalid={props.touched.text && props.errors.text}
                            />                    
                            <FormFeedback invalid={props.touched.text && props.errors.text}>{props.errors.text}</FormFeedback>                            
                        </FormGroup>
                    </Form>
                </ModalBody>
                <ModalFooter>
                    <Button color="success" onClick={props.handleSubmit}>
                        <FaRegSave className='mr-2' /> Sauvegarder
                    </Button>{' '}
                    <Button color="secondary" onClick={props.toggle}>
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
    }),
    validationSchema: Yup.object().shape({
        title: Yup.string()
                    .min(5, 'Le titre doit contenir au moins 5 caractères.')
                    .max(30, 'Le titre ne doit pas dépasser 60 caractères.')
                    .required("Vous devez donner un titre à l'annotation."),
        text: Yup.string()
                    .min(3, 'Annotation trop courte.')
                    .required('Veuillez préciser votre annotation.'),        
    }),
    handleSubmit: (values, {props}) => {
        props.save(values.title, values.text, props.parentId)
    }
})(AddAnnotationModal)