import React, {useState, useEffect} from "react"

export default function MinigameThree(props) {
    const {style, score, onFinish, ...rest} = props

    const finishMinigame = () => {
    	const finalScore = 300
    	onFinish(finalScore)
    }

    return (
        <div style={{...style, backgroundColor:"blue", color:"white", height:"100%"}}>
            Minigame 3. Score: {score}
            <button onClick={finishMinigame}>
			  Finish
			</button>
        </div>
    )
}