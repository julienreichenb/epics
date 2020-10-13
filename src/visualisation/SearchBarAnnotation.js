import React from 'react'
import { Button, Input, InputGroup, InputGroupAddon } from 'reactstrap'
import { FaSearch, FaTimes } from 'react-icons/fa'
import { withFormik } from 'formik'
import * as Yup from 'yup'
import './SearchBarAnnotation.scss'

const SearchBarAnnotation = props => {

    const resetField = () => {
        props.setFieldValue('search', '')
        props.handleSubmit(props.values, {props})
    }

    const _onKeyDown = (event) => {
        if (event.key === 'Enter')
            props.handleSubmit(props.values, {props})
    }

    return (
        <>
            <InputGroup className='mx-2 mt-3'>
                <InputGroupAddon addonType="prepend">
                    <Button onClick={props.handleSubmit}>
                        <FaSearch />
                    </Button>
                </InputGroupAddon>
                <Input placeholder='Rechercher une annotation...' 
                    type="text" 
                    name="search" 
                    id="search" 
                    value={props.values.search}
                    onChange={props.handleChange} 
                    onBlur={props.handleBlur}  
                    onKeyDown={_onKeyDown}        
                />
                {props.values.search !== '' &&
                <InputGroupAddon addonType="append">
                    <Button color='light' onClick={resetField}>
                        <FaTimes className='text-muted' />
                    </Button>                
                </InputGroupAddon>
                }
            </InputGroup>
        </>
    )
}

export default withFormik({
    mapPropsToValues: () => ({
        search: '',
    }),
    validationSchema: Yup.object().shape({
        search: Yup.string()                
    }),
    handleSubmit: (values, {props}) => {
        props.search(values.search)
    },
})(SearchBarAnnotation)