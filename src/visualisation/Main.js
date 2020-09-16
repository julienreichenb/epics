import React, { useEffect, useState } from 'react'
import { Row, Col } from 'reactstrap'
import VegaChart from './VegaChart'
import Loading from './Loading'
import './Main.css' 

const Main = props => {
    const [isTrue, setIsTrue] = useState(true)
    return (
        <>
            <div className='Main'>
                {props.loading 
                ? <Loading color="dark">
                    <h3>Chargement des graphiques...</h3>                
                </Loading>
                : <>                        
                    <VegaChart title={'Radiomics Heatmap'} chart={props.lasagna} type='vega-lite' />
                    <VegaChart title={'Principle Component Analysis'} chart={props.pca} type='vega' />
                </>
                }
            </div>
        </>
    )
}

export default Main