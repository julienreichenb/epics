import React, { useEffect, useState, useContext, useRef } from 'react'
import UserContext from './context/UserContext'
import SidePanel from './visualisation/SidePanel'
import Main from './visualisation/Main'
import AnnotationPanel from './visualisation/AnnotationPanel'
import './Visualisation.css'
import backend from './services/backend'
// Chart Specs
import PCA from './assets/charts/PCA.json'
import Lasagna from './assets/charts/Lasagna.json'
import PCAJS from 'pca-js'

const Visualisation = props => {
    // Init
    const user = useContext(UserContext)
    const main = useRef(null)
    const [loading, setLoading] = useState(true)
    // Features
    const [features, setFeatures] = useState([])
    const [regions, setRegions] = useState([])
    const [modalities, setModalities] = useState([])
    // Annotations
    const annotationPannel = useRef(null)
    const [annotations, setAnnotations] = useState([])
    // Charts
    const [pcaChart, setPcaChart] = useState(null)
    const [pcaImg, setPcaImg] = useState(null)
    const [lasagnaData, setLasagnaData] = useState(null)
    const [lasagnaChart, setLasagnaChart] = useState(null)
    const [lasagnaImg, setLasagnaImg] = useState(null)

    // Get features & annotations
    useEffect(() => {
      apiCalls()
    }, [])

    // Refresh charts on feature changes
    useEffect(() => {
      if (lasagnaData) loadCharts(features)
    }, [features])

    // Update Vega
    useEffect(() => {
      if (pcaChart && lasagnaChart) {
        setLoading(false)      
        loadImages()
      }
    }, [lasagnaChart, pcaChart])

    const apiCalls = () => {
      // PCAonly()
      loadFeatures()
      loadAnnotations()
    }

    /**
     * Testing purpose only
     */
    const PCAonly = () => {
      setLasagnaData([])
      setLasagnaChart([])
      setLoading(false)
      setupPCA()
    }

    const loadImages = () => {
      const waitingMain = setInterval(() => {
        if (main.current) {
          clearInterval(waitingMain)
          let pca = null
          let lasagna = null
          const waitingCharts = setInterval(() => {
            try {
              pca = main.current.getChart('pca')
              lasagna = main.current.getChart('lasagna')
              if (pca !== null && lasagna !== null) {
                clearInterval(waitingCharts)
                setPcaImg(pca)
                setLasagnaImg(lasagna)
              }
            } catch {}            
          }, 1000)
        }
      }, 1000)
    }

    const loadFeatures = async () => {
      const newFeatures = []
        const data = await backend.getLasagnaData(props.albumId)
        const featuresNames = [...new Set(data.features.map((f) => f.feature_id))]
        setModalities([...new Set(data.features.map((m) => m.Modality))])
        setRegions([...new Set(data.features.map((r) => r.ROI))])
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
      ** JSON.parse(lines) !!
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

    const displayAnnotation = (annotation) => {
      main.current.displayAnnotation(annotation)
    }

    const askDelete = (annotation) => {
      annotationPannel.current.askDelete(annotation)
    }

    const askEdit = (annotation) => {
      annotationPannel.current.askEdit(annotation)
    }

    const askAnswer = (annotation) => {
      annotationPannel.current.askAnswer(annotation)
    }

    const saveAnnotation = (title, text, lines, parentId, currentAnnot) => {
      let newAnnotations = [...annotations]
      const newAnnot = {
        id: 100, // Should be managed by the ORM
        parentId: 0,
        title,
        text,
        lines,
        pcaSpec: JSON.stringify(pcaChart.spec),
        lasagnaSpec: JSON.stringify(lasagnaChart.spec),
        selectedFeatures: JSON.stringify(features.filter((f) => f.selected).map(({ feature_id }) => feature_id)),
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
    }

    const deleteAnnotation = (id, willBeDeleted = true) => {
      let deletedAnnot = annotations.find((a) => a.id === id)
      deletedAnnot.deleted = willBeDeleted
      setAnnotations([...annotations])
      // TODO: Delete in Database
    }

    const loadCharts = (features) => {      
      setupLasagna(features)
      setupPCA(['CT', 'PT'])
      // Other charts ?      
    }

    const setupLasagna = async (features) => {
      const properData = {
        features: await filterFeatures(features, lasagnaData.features),
        status: lasagnaData.outcomes
      }
      const lasagnaSpec = { ...Lasagna }
      lasagnaSpec.data = { "name": ["features", "status"] }
      setLasagnaChart({
        data: properData,
        spec: lasagnaSpec,
      })
    }

    const setupPCA = async (pcaSpecs) => {
      const selection = await filterPCASpecs(pcaSpecs, lasagnaData.features)
      // Get patients raw values for each dimension
      const firstDimension = []
      const secondDimension = []
      lasagnaData.outcomes.map((p) => {
        firstDimension.push(selection[0].filter((s) => s.PatientID === p.PatientID).map((a) => a.feature_value))
        secondDimension.push(selection[1].filter((s) => s.PatientID === p.PatientID).map((a) => a.feature_value))
      })
      // Compute PCA values for each dimension
      const firstVectors = PCAJS.getEigenVectors(firstDimension)
      const firstAdjusted = PCAJS.computeAdjustedData(firstDimension, firstVectors[0]).adjustedData[0]
      const secondVectors = PCAJS.getEigenVectors(secondDimension)
      const secondAdjusted = PCAJS.computeAdjustedData(secondDimension, secondVectors[0]).adjustedData[0]
      const formattedPCAData = lasagnaData.outcomes.map((value, index, array) => {
        const patientData = { ...value }
        patientData.Score1 = firstAdjusted[index]
        patientData.Score2 = secondAdjusted[index]
        patientData.Outcome = patientData.Outcome = 0 ? 'Begnin' : 'Malin'
        patientData["Symbol(vega_id)"] = Math.floor(Math.random() * 10000)
        return patientData
      })
      const pcaData = {
        source: formattedPCAData,
      }
      const pcaSpec = { ...PCA }
      pcaSpec.data = [
        { name: "source" },
        { name: "density", source: PCA.data[1].source, transform: PCA.data[1].transform },
        { name: "contours", source: PCA.data[2].source, transform: PCA.data[2].transform },
      ]
      pcaSpec.height = 500
      pcaSpec.width = 500
      pcaSpec.axes[0].title = 'First Principal Component (' + pcaSpecs[0] + ', ' + (PCAJS.computePercentageExplained(firstVectors, firstVectors[0]) * 100).toFixed(2) + '%' + ')'
      pcaSpec.axes[1].title = 'First Principal Component (' + pcaSpecs[1] + ', ' + (PCAJS.computePercentageExplained(secondVectors, secondVectors[0]) * 100).toFixed(2) + '%' + ')'
      setPcaChart({
        data: pcaData,
        spec: pcaSpec,
      })
    }
      
    /*
    ** Only consider the features selected by the user
    */
    const filterFeatures = async (features, data) => {
      const selectedFeatures = await features.filter((f) => f.selected)
      const filteredData = []
      await data.map((d) => {
        selectedFeatures.map((f) => {
          if (d.feature_id === f.key) {
            filteredData.push(d)
          }
        })
      }) 
      return filteredData
    }

    const filterPCASpecs = async (specs, data) => {
      const firstSet = await data.filter((f) => f.feature_id.includes(specs[0]))
      const secondSet = await data.filter((f) => f.feature_id.includes(specs[1]))
      return [firstSet, secondSet]
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
          <Main 
            ref={main}
            charts={[
              {
                id: 'lasagna',
                title: 'Radiomics Heatmap',
                chart: lasagnaChart,
                type: 'vega-lite',
                clusterable: true,
              },
              {
                id: 'pca',
                title: 'Principle Component Analysis',
                chart: pcaChart,
                type: 'vega',
                clusterable: false,
              }
            ]}
            images={[
              {
                id: 'pca',
                img: pcaImg
              },
              {
                id: 'lasagna',
                img: lasagnaImg
              }
            ]}
            loading={loading}
            askDelete={askDelete}
            askEdit={askEdit}
            askAnswer={askAnswer}
            reloadImages={loadImages}
          /> 
          <AnnotationPanel 
            ref={annotationPannel}
            annotations={annotations} 
            displayAnnotation={displayAnnotation}
            saveAnnotation={saveAnnotation} 
            deleteAnnotation={deleteAnnotation}        
            user={user}
            chartsImg={[
              {
                id: 'pca',
                img: pcaImg
              },
              {
                id: 'lasagna',
                img: lasagnaImg
              }
            ]} />      
        </div>
      </>
    )
  }
  
  export default Visualisation