import React, {useState, useEffect, useRef} from "react"
import FreeCanvas from './Canvas'

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
                <FreeCanvas ref={childRef} width={600} height={800} targetWidth={337} targetHeight={685} />
            </div>
        </div>
    )
}