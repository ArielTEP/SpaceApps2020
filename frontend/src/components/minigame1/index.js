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
    const {style, onFinish, ...rest} = props

    // This will keep track of the score
    const [score, setScore] = useState(0)

    // Timer hook. Set to TIME_PER_PART seconds per piece
    const TIME_PER_PART = 15
    const {
        seconds,
        restart
    } = useTimer({ expiryTimestamp: get_expiry_timestamp(TIME_PER_PART), onExpire: () => switchPart() })

    // This will control the current part to draw
    const [currentPart, setCurrentPart] = useState(1)
    const switchPart = () => {
        setCurrentPart(currentPart+1)
        //restart( get_expiry_timestamp(TIME_PER_PART) )
    }

    // This will be called when a part has been drawn
    const onPartFinished = (partScore) => {
        setScore(score + partScore)
        // If the last part is drawn, the minigame is over
        const lastPart = false
        if( lastPart ) {
            finishMinigame()
        }
        else {
            switchPart()
        }
    }

    // This will be called when the minigame is over and it will notify the parent
    const finishMinigame = () => {
        onFinish(score)
    }

    return (
        <div style={{...style, display:"flex", flexDirection:"column", height:"100%"}}>
            Timer: {seconds}
            <CraftDrawer style={{flex:1}} partIndex={currentPart} onPartFinished={onPartFinished} />
        </div>
    )
}