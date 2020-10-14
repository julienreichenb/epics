import React, { useEffect, useState, useContext } from 'react'
import UserContext from './context/UserContext'
import SidePanel from './visualisation/SidePanel'
import Main from './visualisation/Main'
import AnnotationPanel from './visualisation/AnnotationPanel'
import './Visualisation.css'
import backend from './services/backend'
// Chart Specs
import PCA from './assets/charts/PCA.json'
import Lasagna from './assets/charts/Lasagna.json'

const Visualisation = props => {
    // Init
    const user = useContext(UserContext);
    const [loading, setLoading] = useState(true)
    // Features
    const [features, setFeatures] = useState([])
    const [regions, setRegions] = useState([])
    const [modalities, setModalities] = useState([])
    // Annotations
    const [annotations, setAnnotations] = useState([])
    // Charts
    const [lasagnaData, setLasagnaData] = useState(null)
    const [pcaChart, setPcaChart] = useState(null)
    const [lasagnaChart, setLasagnaChart] = useState(null)

    // Get features & annotations
    useEffect(() => {
      apiCalls()
    }, [])

    // Refresh charts on feature change
    useEffect(() => {
      if (lasagnaData) loadCharts(features)
    }, [features])

    // Update Vega
    useEffect(() => {
      if(pcaChart && lasagnaChart) setLoading(false)
    }, [lasagnaChart, pcaChart])

    const apiCalls = () => {
      loadFeatures()
      loadAnnotations()
    }

    const loadFeatures = async () => {
      const data = await backend.getLasagnaData(props.albumId)
      const featuresNames = [... new Set(data.features.map((f) => f.feature_id))]
      setModalities([ ... new Set(data.features.map((m) => m.Modality))])
      setRegions([ ... new Set(data.features.map((r) => r.ROI))])
      const newFeatures = []
      featuresNames.map((f) => {
        const feature = {
          key: f,
          name: data.features.find((x) => x.feature_id === f).feature_name,
          selected: true,
        }
        newFeatures.push(feature)
      })
      setLasagnaData(data)
      setFeatures(newFeatures)
    }

    const loadAnnotations = () => {
      /*
      ** Temporary solution, should be done through the API
      ** albumId should be added
      */
      const annots = [
        {
          id: 50,
          parentId: 0,
          user: 12,
          title: 'My long title',
          text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin vel libero ipsum. Etiam fermentum dui nisl, quis porttitor velit porttitor quis. Nullam et enim tristique, commodo turpis ac, hendrerit sem. Nulla hendrerit tincidunt felis a euismod. Nam eros libero, suscipit vehicula mi a, elementum efficitur tellus. Sed non bibendum arcu, sed placerat massa. Proin suscipit, arcu sit amet iaculis finibus, eros ante mattis mi, vel finibus diam dui convallis lectus. Etiam aliquam aliquet massa, a aliquet augue eleifend eget.',
          date: new Date(2020, 3, 1, 12, 30, 22),
        },
        {
          id: 1,
          parentId: 0,
          user: 1,
          title: 'My other long title',
          text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin vel libero ipsum. Etiam fermentum dui nisl, quis porttitor velit porttitor quis. Nullam et enim tristique, commodo turpis ac, hendrerit sem. Nulla hendrerit tincidunt felis a euismod. Nam eros libero, suscipit vehicula mi a, elementum efficitur tellus. Sed non bibendum arcu, sed placerat massa. Proin suscipit, arcu sit amet iaculis finibus, eros ante mattis mi, vel finibus diam dui convallis lectus. Etiam aliquam aliquet massa, a aliquet augue eleifend eget.',
          date: new Date(2020, 3, 1, 12, 0, 0),
        },
        {
          id: 2,
          parentId: 1,
          user: 2,
          title: 'My Answer',
          text: 'This is a search',
          date: new Date(2020, 3, 1, 13, 0, 0),
        },
        {
          id: 3,
          parentId: 1,
          user: 1,
          title: 'My Other Answer',
          text: 'This is another answer',
          date: new Date(2020, 3, 1, 13, 30, 0),
        },
        {
          id: 4,
          parentId: 0,
          user: 2,
          title: 'My Title',
          text: 'New comment !',
          date: new Date(2020, 3, 10, 12, 0, 0),
        },
      ]
      setAnnotations(annots)
    }

    const saveAnnotation = (title, text, lines, parentId, currentAnnot) => {
      let newAnnotations = [...annotations]
      const newAnnot = {
        id: 100, // Should be managed by the ORM
        parentId: 0,
        title,
        text,
        lines,
        user: 5, // Get current user ID
        date: new Date(),
      }
      if (currentAnnot) {
        newAnnot.id = currentAnnot.id
        // Remove old annotation
        newAnnotations = newAnnotations.filter((a) => a.id !== currentAnnot.id)
      }
      if (parentId)
        newAnnot.parentId = parentId
      // Refresh the list
      newAnnotations.push(newAnnot)
      setAnnotations(newAnnotations)
      // TODO: Save in Database
    }

    const deleteAnnotation = (id) => {
      let deletedAnnot = annotations.find((a) => a.id === id)
      deletedAnnot.deleted = true
      setAnnotations([...annotations])
      // TODO: Delete in Database
    }

    const loadCharts = (features) => {      
      setupLasagna(features)
      setupPCA(features)
      // Other charts ?      
    }

    const setupLasagna = (features) => {
      const properData = {
        features: filterFeatures(features, lasagnaData.features),
        status: lasagnaData.outcomes
      }
      const lasagnaSpec = { ...Lasagna }
      lasagnaSpec.data = { "name": ["features", "status"] }
      setLasagnaChart({
        data: properData,
        spec: lasagnaSpec,
      })
    }

    const setupPCA = (features) => {
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
      
    /*
    ** Only consider the features selected by the user
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

    const change = (feature, force = null) => {
      if (force !== null) {
        features.find(f => f.key === feature.key).selected = force
      } else {
        features.find(f => f.key === feature.key).selected = !feature.selected
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
          <SidePanel 
            features={features} 
            selectedCpt={features.filter((f) => f.selected).length}
            regions={regions} 
            modalities={modalities} 
            change={change}
            forceChange={change}
            all={selectAll}
          />
          <Main lasagna={lasagnaChart} pca={pcaChart} loading={loading} /> 
          <AnnotationPanel 
            annotations={annotations} 
            saveAnnotation={saveAnnotation} 
            deleteAnnotation={deleteAnnotation}
            user={user} />      
        </div>
      </>
    )
  }
  
  export default Visualisation