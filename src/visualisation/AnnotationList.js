import React, { useEffect, useState } from 'react'
import { FaComment } from 'react-icons/fa'
import './AnnotationList.scss'
import { SubMenu, MenuItem } from 'react-pro-sidebar'

const AnnotationList = props => {

    const [parentAnnotations, setParentAnnotations] = useState([])

    // Prepare annotations
    useEffect(() => {
        const annots = []
        props.annotations.map((a) => {
            const annot = {
                id: a.id,
                user: a.id,
                title: a.title,
                text: a.text,
                date: a.date,
            }
            if(!a.parentId) {
                annot.answers = []
                annots.push(annot)
            } else {
                annots.find((x) => x.id === a.parentId).answers.push(annot)
            }
        })
        setParentAnnotations(annots)
    }, [props.annotations])

    return (
        <>
            {parentAnnotations.map((a) => {
                return (
                    <SubMenu key={a.id} icon={<FaComment />} className='SidePanelSubMenu' title={!props.collapsed && a.title}>
                        <div className="SidePanelItem p-3">
                            {a.text}
                        </div>
                        {a.answers.map((x) => {
                            return (
                                <SubMenu key={x.id} className='SidePanelSubMenu' title={!props.collapsed && x.title}>
                                    <div className="SidePanelItem p-3">
                                        {x.text}
                                    </div>
                                </SubMenu>
                            )
                        })}
                    </SubMenu>
                )
            })}
        </>
    )
}

export default AnnotationList   