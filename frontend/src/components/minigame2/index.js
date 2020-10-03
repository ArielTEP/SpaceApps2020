import React, {useState, useEffect} from "react"

export default function MinigameTwo(props) {
    const {style, score, onFinish, ...rest} = props

    const finishMinigame = () => {
    	const finalScore = 200
    	onFinish(finalScore)
    }

    return (
        <div style={{...style, backgroundColor:"green", color:"white", height:"100%"}}>
            Minigame 2. Score: {score}
            <button onClick={finishMinigame}>
			  Finish
			</button>
        </div>
    )
}