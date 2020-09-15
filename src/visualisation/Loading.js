import React, { useEffect, useState } from 'react'
import { FaSpinner } from 'react-icons/fa'
import './Loading.scss' 

const Loading = props => {
    return (
        <>
            <div className="Loading" style={{color: props.color}}>
                <h1><FaSpinner className="icon" /></h1>
                <h4>
                    {props.children ? props.children : 'Chargement...'}
                </h4>
            </div>
        </>
    )
}

export default Loading