import React, { useEffect, useState } from 'react'
import { Vega, VegaLite } from 'react-vega'
import Loading from './Loading'
import './Main.css' 

const Main = props => {
    // 'useState' here
    // const [item, setItem] = useState(default)

    // 'useEffect' here
    // useEffect (() => {
        // code here : equivalent to 'ComponentDidMount'
        // return () => {} // equivalent to 'ComponentWillMount'
    //  }, []) // in array : props/states that trigger the useEffect (no array = all), equivalent to 'ComponentWillUpdate'
    return (
        <>
            <div className='Main'>
                {props.loading ? <Loading>Chargement des graphiques...</Loading> 
                :   (
                    <>
                        <div>
                            <VegaLite spec={props.lasagna.spec} data={props.lasagna.data} />
                        </div>
                        <div>
                            <Vega spec={props.pca.spec} data={props.pca.data} />
                        </div>
                    </>
                    )}
            </div>
        </>
    )
}

export default Main