import React, { useState, useEffect } from 'react'
import { FormGroup, Form, Label, Input, Row, Col } from 'reactstrap'
import { withFormik } from 'formik'
import './CanvasOptions.css' 

const CanvasOptions = props => {
    const [sizeOptions, setSizeOptions] = useState([1, 2, 3, 4, 5])

    useEffect(() => {
        props.handleSubmit()
    }, [])

    const handleChange = (e) => {
        props.handleChange(e)
        props.handleSubmit()
    }
    
    return (
        <>
            <Form className='my-2'>
                <Row>
                    <Col xs='6'>
                        <FormGroup>
                            <Label for="size">Taille du trait</Label>
                            <Input type="select" 
                                name="size"
                                id="size"
                                value={props.values.size}
                                onChange={handleChange}
                            >
                                {sizeOptions.map((o) => {
                                    return (
                                        <option key={o}>{o}</option>
                                    )
                                })}
                            </Input>
                        </FormGroup>
                    </Col>
                    <Col>
                        <FormGroup>
                            <Label for="color">Couleur du trait</Label>
                            <Input 
                                type="color" 
                                name="color" 
                                id="color"
                                value={props.values.color}
                                onChange={handleChange}
                            />
                        </FormGroup>
                    </Col>
                </Row>                           
            </Form>
        </>
    )
}

export default withFormik({
    mapPropsToValues: () => ({
        size: 2,
        color: '#000000',
    }),
    handleSubmit: (values, {props}) => {
        props.change({color: values.color, size: values.size})
    },
})(CanvasOptions)