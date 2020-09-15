import React, { useEffect, useState } from 'react'
import UserContext from './context/UserContext'
import './Visualisation.css'
import SidePanel from './visualisation/SidePanel'
import Main from './visualisation/Main'
// Temporary -> will load from backend
import PCA from './assets/charts/PCA.json'
import Lasagna from './assets/charts/Lasagna.json'

const Visualisation = props => {
    // const user = useContext(UserContext);
    const [loading, setLoading] = useState(true)
    const [features, setFeatures] = useState([])
    const [pcaChart, setPcaChart] = useState(null)
    const [lasagnaChart, setLasagnaChart] = useState(null)

    // Initial feature loading
    useEffect(() => {
      loadFeatures()
    }, [])

    // Refresh charts on feature change
    useEffect(() => {
      apiCalls()
    }, [features])

    // Update Vega
    useEffect(() => {
      setLoading(false)
    }, [lasagnaChart, pcaChart])

    const apiCalls = () => {
      setLoading(true)
      loadCharts(features)
    }

    const loadFeatures = () => {
      const featuresNames = [... new Set(Lasagna.data.values.map((f) => f.feature_name))]
      const newFeatures = []
      featuresNames.map((f, index) => {
        newFeatures.push({
          id: index,
          name: f,
          selected: true
        })
      })
      setFeatures(newFeatures)
    }

    const loadCharts = (features) => {
      // Check which features are selected
      /*
      ** API call for data fetching
      */
      // Lasagna
      const lasagnaData = {
        data: Lasagna.data.values
      };
      const lasagnaSpec = { ...Lasagna }
      lasagnaSpec.data = { "name": "data" }
      lasagnaSpec.height = 500
      lasagnaSpec.width = 500
      setLasagnaChart({
        data: lasagnaData,
        spec: lasagnaSpec,
      })
      // PCA
      const pcaData = {
        source: PCA.data[0].values,
      }
      const pcaSpec = { ...PCA }
      pcaSpec.data = [
        { name: "source" },
        { name: "density", source: PCA.data[1].source, transform: PCA.data[1].transform },
        { name: "contours", source: PCA.data[2].source, transform: PCA.data[2].transform },
      ]
      pcaSpec.height = 500
      pcaSpec.width = 500
      setPcaChart({
        data: pcaData,
        spec: pcaSpec,
      })
    }

    const change = (parent, feature) => {
      if(parent) {
        features.find(f => f.name === parent.name).items.find(i => i.name === feature.name).selected = !feature.selected
      } else {
        features.find(f => f.name === feature.name).selected = !feature.selected
      }
      setFeatures([...features])
    }

    return (
      <>
        <div className='Visualisation'>
          <SidePanel features={features} change={change} />
          <Main lasagna={lasagnaChart} pca={pcaChart} loading={loading} />       
        </div>
      </>
    )
  }
  
  export default Visualisation