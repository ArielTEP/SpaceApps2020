import React, {useState, useEffect, useRef} from "react"
import FreeCanvas from './Canvas'
import AutoSizer from 'react-virtualized-auto-sizer'

export default function CraftDrawer(props) {
    const {style, partIndex, onPartFinished, ...rest} = props

    // Change the image to load
    const finishMinigame = () => {
        const finalScore = 100
        onPartFinished(finalScore)
    }

    // Score drawing
    const childRef = useRef();
    useEffect(() => {
        if( partIndex !== 1){
            const drawing = childRef.current.getImage()
            // Compare with target
            const target = `/minigame1/parts_sc6/sc6p1.target.png`
        }
    }, [partIndex])

    return (
        <div style={{...style, display:"flex", flexDirection:"row"}}>
            <div style={{flex:1, backgroundImage:`url(/minigame1/parts_sc6/sc6p${partIndex%5}.png)`}} className="mg1-drawer-box mg1-drawer-target">

            </div>
            <div style={{flex:1}} className="mg1-drawer-box">
                <AutoSizer>
                    {({height, width}) => (
                        <FreeCanvas ref={childRef} width={width} height={height} targetWidth={337} targetHeight={685} />
                    )}
                </AutoSizer>
            </div>
        </div>
    )
}