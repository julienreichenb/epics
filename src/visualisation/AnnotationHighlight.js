import React, { useEffect, useState } from 'react'
import { FaHighlighter } from 'react-icons/fa'
import { Tooltip } from 'reactstrap'
import './AnnotationHighlight.css'

const AnnotationHighlight = props => {
    const [tooltipOpen, setTooltipOpen] = useState(false);

    const toggle = () => setTooltipOpen(!tooltipOpen);


    return (
        <>
            <FaHighlighter className='text-success' id='highlight' />
            <Tooltip innerClassName='annotation-highlight' target="highlight" placement='right' isOpen={tooltipOpen} toggle={toggle}>Annotation manuelle</Tooltip>
        </>
    )
}

export default AnnotationHighlight