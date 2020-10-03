import React, {useState, useEffect} from "react"

export default function MinigameOne(props) {
    const {style, onFinish, ...rest} = props

    const finishMinigame = () => {
    	const finalScore = 100
    	onFinish(finalScore)
    }

    return (
        <div style={{...style, backgroundColor:"red", color:"white", height:"100%"}}>
            Minigame 1. 
            <button onClick={finishMinigame}>
			  Finish
			</button>
        </div>
    )
}