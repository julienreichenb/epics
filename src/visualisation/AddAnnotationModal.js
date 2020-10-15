import React, { useState, useEffect, useRef } from 'react'
import { Button, ButtonGroup, Modal, ModalHeader, ModalBody, ModalFooter, Input, Label, Form, FormGroup, FormFeedback } from 'reactstrap'
import { FaRegSave, FaTimes, FaStepBackward } from 'react-icons/fa'
import { withFormik } from 'formik'
import * as Yup from 'yup'
import './AddAnnotationModal.css'
import CanvasDraw from 'react-canvas-draw'

const AddAnnotationModal = props => {
    const drawEl = useRef(null)
    const [pca, setPca] = useState(null)

    useEffect(() => {
        if (props.annotation) {
            props.setFieldValue('title', props.annotation.title)
            props.setFieldValue('text', props.annotation.text)
            if (props.annotation.lines && props.annotation.lines.length > 0) {
                props.setFieldValue('lines', props.annotation.lines)
                redraw()
            }
        }
    }, [props.annotation, drawEl])

    useEffect(() => {
        convertURIToImageData(props.chartsImg[0]).then((img) => {
            setPca(img)
        })
        console.log(pca)
    }, [props.show])

    const submit = () => {
        getLines()
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
        props.setFieldValue('lines', drawEl.current.getSaveData())
    }

    const redraw = () => {
        setTimeout(() => {
            drawEl.current.loadSaveData(props.annotation.lines, true)
        }, 200)
    }
    
    const convertURIToImageData = (URI) => {
        return new Promise((resolve, reject) => {
          if (URI == null) return reject();
          const canvas = document.createElement('canvas'),
              context = canvas.getContext('2d'),
              image = new Image();
          image.addEventListener('load', () => {
            canvas.width = image.width;
            canvas.height = image.height;
            context.drawImage(image, 0, 0, canvas.width, canvas.height);
            resolve(context.getImageData(0, 0, canvas.width, canvas.height));
          }, false);
          image.src = URI;
        });
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
                    <ButtonGroup className='w-100 text-center'>
                        <Button color='danger' onClick={() => drawEl.current.clear()}>
                            <FaTimes className='mr-2' /> Effacer les lignes
                        </Button>
                        <Button color='info' onClick={() => drawEl.current.undo()}>
                            <FaStepBackward className='mr-2' /> Effacer la dernière ligne
                        </Button>
                    </ButtonGroup>
                    { pca && 
                        <CanvasDraw ref={drawEl} 
                            brushRadius={3} 
                            imgSrc={props.chartsImg} 
                            className='mx-auto' 
                            style={{width: pca.width, height: pca.height}}
                        />
                    }
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