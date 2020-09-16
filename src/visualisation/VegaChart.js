import React, { useEffect, useState } from 'react'
import { Vega, VegaLite } from 'react-vega'
import './VegaChart.scss'

const VegaChart = props => {
    return (
        <>
            <div className='VegaChart'>
                <h4>{props.title}</h4>
                {props.type === 'vega' 
                ? <Vega spec={props.chart.spec} data={props.chart.data} />
                : props.type === 'vega-lite' 
                ? <VegaLite spec={props.chart.spec} data={props.chart.data} />    
                : <h5>Graphique inconnu</h5>
                }   
            </div>                                       
        </>
    )
}

export default VegaChart