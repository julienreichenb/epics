import React, { useEffect, useState } from 'react'
import UserContext from './context/UserContext'
import SidePanel from './visualisation/SidePanel'
import Main from './visualisation/Main'
import AnnotationPanel from './visualisation/AnnotationPanel'
import './Visualisation.css'
// Temporary -> will load from backend
import PCA from './assets/charts/PCA.json'
import Lasagna from './assets/charts/Lasagna.json'

const Visualisation = props => {
    // const user = useContext(UserContext);
    const [loading, setLoading] = useState(true)
    const [features, setFeatures] = useState([])
    const [annotations, setAnnotations] = useState([])
    const [pcaChart, setPcaChart] = useState(null)
    const [lasagnaChart, setLasagnaChart] = useState(null)

    // Initial feature loading
    useEffect(() => {
      loadFeatures()
      loadAnnotations()
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
      loadCharts(features)
    }

    const loadFeatures = () => {
      /*
      ** Temporary solution, should be done through the API
      */ 
      const featuresNames = [... new Set(Lasagna.datasets.features.map((f) => f.feature_name))]
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

    const loadAnnotations = () => {
      /*
      ** Temporary solution, should be done through the API
      */
      const annots = [
        {
          id: 0,
          user: 1,
          title: 'My very long title that should fit in the component without going outside it eheh',
          text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin vel libero ipsum. Etiam fermentum dui nisl, quis porttitor velit porttitor quis. Nullam et enim tristique, commodo turpis ac, hendrerit sem. Nulla hendrerit tincidunt felis a euismod. Nam eros libero, suscipit vehicula mi a, elementum efficitur tellus. Sed non bibendum arcu, sed placerat massa. Proin suscipit, arcu sit amet iaculis finibus, eros ante mattis mi, vel finibus diam dui convallis lectus. Etiam aliquam aliquet massa, a aliquet augue eleifend eget.',
          date: new Date(2020, 3, 1, 12, 30, 22),
        },
        {
          id: 1,
          user: 1,
          title: 'My very long title that should fit in the component without going outside it eheh',
          text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin vel libero ipsum. Etiam fermentum dui nisl, quis porttitor velit porttitor quis. Nullam et enim tristique, commodo turpis ac, hendrerit sem. Nulla hendrerit tincidunt felis a euismod. Nam eros libero, suscipit vehicula mi a, elementum efficitur tellus. Sed non bibendum arcu, sed placerat massa. Proin suscipit, arcu sit amet iaculis finibus, eros ante mattis mi, vel finibus diam dui convallis lectus. Etiam aliquam aliquet massa, a aliquet augue eleifend eget.',
          date: new Date(2020, 3, 1, 12, 0, 0),
        },
        {
          id: 2,
          parentId: 1,
          user: 2,
          title: 'My Title',
          text: 'This is an answer',
          date: new Date(2020, 3, 1, 13, 0, 0),
        },
        {
          id: 3,
          parentId: 1,
          user: 1,
          title: 'My Title',
          text: 'This is another answer',
          date: new Date(2020, 3, 1, 13, 30, 0),
        },
        {
          id: 4,
          user: 2,
          title: 'My Title',
          text: 'New comment !',
          date: new Date(2020, 3, 10, 12, 0, 0),
        },
        {
          id: 5,
          parentId: 4,
          user: 3,
          title: 'My Title',
          text: 'New answer !',
          date: new Date(2020, 3, 10, 12, 10, 23),
        },
        {
          id: 6,
          parentId: 4,
          user: 3,
          title: 'My Title',
          text: 'New answer !',
          date: new Date(2020, 3, 10, 12, 10, 12),
        },
        {
          id: 7,
          parentId: 4,
          user: 2,
          title: 'My Title',
          text: 'New answer !',
          date: new Date(2020, 3, 10, 12, 10, 8),
        },
        {
          id: 8,
          parentId: 4,
          user: 1,
          title: 'My Title',
          text: 'New answer !',
          date: new Date(2020, 3, 10, 12, 15, 0),
        },
        {
          id: 9,
          parentId: 4,
          user: 1,
          title: 'My Title',
          text: 'New answer !',
          date: new Date(2020, 3, 10, 12, 16, 4),
        },
        {
          id: 10,
          parentId: 4,
          user: 1,
          title: 'My Title',
          text: 'New answer !',
          date: new Date(2020, 3, 10, 12, 10, 0),
        },
        {
          id: 11,
          parentId: 4,
          user: 1,
          title: 'My Title',
          text: 'New answer !',
          date: new Date(2020, 3, 10, 12, 10, 0),
        },
        {
          id: 12,
          parentId: 4,
          user: 1,
          title: 'My Title',
          text: 'New answer !',
          date: new Date(2020, 3, 10, 12, 10, 0),
        },
        {
          id: 13,
          parentId: 4,
          user: 1,
          title: 'My Title',
          text: 'New answer !',
          date: new Date(2020, 3, 10, 12, 10, 0),
        },
        {
          id: 14,
          parentId: 4,
          user: 1,
          title: 'My Title',
          text: 'New answer !',
          date: new Date(2020, 3, 10, 12, 10, 0),
        },
        {
          id: 15,
          parentId: 4,
          user: 1,
          title: 'My Title',
          text: 'New answer !',
          date: new Date(2020, 3, 10, 12, 10, 0),
        },
        {
          id: 16,
          parentId: 4,
          user: 1,
          title: 'My Title',
          text: 'New answer !',
          date: new Date(2020, 3, 10, 12, 10, 0),
        },
        {
          id: 17,
          parentId: 4,
          user: 1,
          title: 'My Title',
          text: 'New answer !',
          date: new Date(2020, 3, 10, 12, 10, 0),
        },
        {
          id: 18,
          parentId: 4,
          user: 1,
          title: 'My Title',
          text: 'New answer !',
          date: new Date(2020, 3, 10, 12, 10, 0),
        },
        {
          id: 19,
          parentId: 4,
          user: 1,
          title: 'My Title',
          text: 'New answer !',
          date: new Date(2020, 3, 10, 12, 10, 0),
        },
        {
          id: 20,
          parentId: 4,
          user: 1,
          title: 'My Title',
          text: 'New answer !',
          date: new Date(2020, 3, 10, 12, 10, 0),
        },
        {
          id: 21,
          parentId: 4,
          user: 1,
          title: 'My Title',
          text: 'New answer !',
          date: new Date(2020, 3, 10, 12, 10, 0),
        },
        {
          id: 22,
          parentId: 4,
          user: 1,
          title: 'My Title',
          text: 'New answer !',
          date: new Date(2020, 3, 10, 12, 10, 0),
        },
        {
          id: 23,
          parentId: 4,
          user: 1,
          title: 'My Title',
          text: 'New answer !',
          date: new Date(2020, 3, 10, 12, 10, 0),
        },
        {
          id: 24,
          parentId: 4,
          user: 1,
          title: 'My Title',
          text: 'New answer !',
          date: new Date(2020, 3, 10, 12, 10, 0),
        },
        {
          id: 25,
          parentId: 4,
          user: 1,
          title: 'My Title',
          text: 'New answer !',
          date: new Date(2020, 3, 10, 12, 10, 0),
        },
        {
          id: 26,
          parentId: 4,
          user: 1,
          title: 'My Title',
          text: 'New answer !',
          date: new Date(2020, 3, 10, 12, 10, 0),
        },
        {
          id: 27,
          parentId: 4,
          user: 1,
          title: 'My Title',
          text: 'New answer !',
          date: new Date(2020, 3, 10, 12, 10, 0),
        },
        {
          id: 28,
          parentId: 4,
          user: 1,
          title: 'My Title',
          text: 'New answer !',
          date: new Date(2020, 3, 10, 12, 10, 0),
        },
        {
          id: 29,
          parentId: 4,
          user: 1,
          title: 'My Title',
          text: 'New answer !',
          date: new Date(2020, 3, 10, 12, 10, 0),
        },
        {
          id: 30,
          parentId: 4,
          user: 1,
          title: 'My Title',
          text: 'New answer !',
          date: new Date(2020, 3, 10, 12, 10, 0),
        },
      ]
      setAnnotations(annots)
    }

    const saveAnnotation = (title, text, parentId) => {
      console.log(parentId)
      const newAnnot = {
        id: 100, // Should be managed by the ORM
        title,
        text,
        user: 5, // Get current user ID,
        date: new Date(),
      }
      if(parentId)
        newAnnot.parentId = parentId
      // Refresh the list
      annotations.push(newAnnot)
      setAnnotations([...annotations])
    }

    /*
    ** Only use the features selected by the user
    */
    const filterFeatures = (features, data) => {
      const selectedFeatures = features.filter((f) => f.selected)
      const filteredData = []
      data.map((d) => {
        selectedFeatures.map((f) => {
          if (d.feature_name === f.name) {
            filteredData.push(d)
          }
        })
      }) 
      return filteredData
    }

    const loadCharts = (features) => {      
      // Check which features are selected
      /*
      ** API call for data fetching
      */
      // Lasagna
      const lasagnaData = {
        // data: filterFeatures(features, Lasagna.datasets.features)
        features: filterFeatures(features, Lasagna.datasets.features),
        status: Lasagna.datasets.status
      }
      const lasagnaSpec = { ...Lasagna }
      lasagnaSpec.data = { "name": ["features", "status"] }
      lasagnaSpec.height = 500
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

    // Bulk select / deselect
    const selectAll = (all) => {
      features.map((f) => {
        f.selected = all
      })
      setFeatures([...features])
    }

    return (
      <>
        <div className='Visualisation'>
          <SidePanel features={features} change={change} all={selectAll} />
          <Main lasagna={lasagnaChart} pca={pcaChart} loading={loading} /> 
          <AnnotationPanel annotations={annotations} loading={loading} saveAnnotation={saveAnnotation} />      
        </div>
      </>
    )
  }
  
  export default Visualisation