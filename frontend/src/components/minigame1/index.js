import React, {useState, useRef} from "react"
import { useTimer } from 'react-timer-hook'
import FreeCanvas from './Canvas'
import AutoSizer from 'react-virtualized-auto-sizer'
import './index.css';
// Utils
import compare from "./comparer"

function get_expiry_timestamp(seconds) {
    const time = new Date()
    time.setSeconds(time.getSeconds() + seconds)
    return time
}

// Store targets as they are drawn
let sketchedParts = []

export default function MinigameOne(props) {
    const {style, onFinish, spacecraft } = props

    // This will keep track of the score
    const [score, setScore] = useState(0)

    // Timer hook. Set to TIME_PER_PART seconds per piece
    const TIME_PER_PART = 8
    const { seconds, restart } = useTimer({ expiryTimestamp: get_expiry_timestamp(TIME_PER_PART), onExpire: () => calculateScore() })

    // This will control the current part to draw
    const [currentPart, setCurrentPart] = useState(0)
    const switchPart = () => {
        const newPartIndex = currentPart+1
        if( spacecraft.parts.length > newPartIndex ) {
            // Update score based on the current drawing
            setCurrentPart(newPartIndex)
            restart( get_expiry_timestamp(TIME_PER_PART) )
        }
        else {
            onFinish(score, sketchedParts)
        }
    }

    // Score drawing
    const childRef = useRef();
    const calculateScore = () => {
        const drawing = childRef.current.getImage()
        // Compare with target if something was drawn
        if( drawing !== null ){
            const target = part.target
            // Store targets and pass to Leo
            sketchedParts.push(drawing)
            // Perform comparison
            compare(target, drawing, (result) => {
                setScore(score + result)
                // Next part
                switchPart()
            })
        }
        else {
            // push the target in case no image was drawn
            sketchedParts.push(part.target)
            switchPart()
        }
    }

    const part = spacecraft.parts[currentPart]
    return (
        <div style={{...style}} className="mg1-container">
            <div className="mg1-header">
                <h1>Sketch your spacecraft</h1>
                <span>Score: {score}</span>
                <span style={{float:"right"}}>Parts left: {spacecraft.parts.length - currentPart}, Timer: {seconds}</span>
            </div>
            <div style={{flex:1, display:"flex", flexDirection:"row"}}>
                <div style={{flex:1, backgroundImage: `url(${part.base})`}} className="mg1-drawer-box mg1-drawer-target" />
                <div style={{flex:1 }} className="mg1-drawer-box">
                    <AutoSizer>
                        {({height, width}) => (
                            <FreeCanvas ref={childRef} width={width} height={height} targetWidth={part.targetWidth} targetHeight={part.targetHeight} />
                        )}
                    </AutoSizer>
                </div>
            </div>
        </div>
    )
}