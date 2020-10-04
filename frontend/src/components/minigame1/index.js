import React, {useState, useEffect} from "react"
import { useTimer } from 'react-timer-hook'
import CraftDrawer from './CraftDrawer'
import './index.css';

function get_expiry_timestamp(seconds) {
    const time = new Date()
    time.setSeconds(time.getSeconds() + seconds)
    return time
}

export default function MinigameOne(props) {
    const {style, onFinish, spacecraft, ...rest} = props

    // This will keep track of the score
    const [score, setScore] = useState(0)

    // Timer hook. Set to TIME_PER_PART seconds per piece
    const TIME_PER_PART = 6
    const {
        seconds,
        restart
    } = useTimer({ expiryTimestamp: get_expiry_timestamp(TIME_PER_PART), onExpire: () => switchPart() })

    // This will control the current part to draw
    const [currentPart, setCurrentPart] = useState(0)
    const switchPart = () => {
        const newPartIndex = currentPart+1
        if( spacecraft.parts.length > newPartIndex ) {
            setCurrentPart(newPartIndex)
            restart( get_expiry_timestamp(TIME_PER_PART) )
        }
        else {
            onFinish(score)
        }
    }

    // This will be called when a part has been drawn
    const onPartFinished = (partScore) => {
        setScore(score + partScore)
        switchPart()
    }


    return (
        <div style={{...style, display:"flex", flexDirection:"column", height:"100%"}}>
            Timer: {seconds}
            <CraftDrawer style={{flex:1}} part={spacecraft.parts[currentPart]} onPartFinished={onPartFinished} />
        </div>
    )
}