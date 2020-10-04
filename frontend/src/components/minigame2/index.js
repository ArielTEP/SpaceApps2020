import React, {useState, useEffect} from "react"

export default function MinigameTwo(props) {
    // "parts" tiene el arreglo de URLs con el resultado del minijuego 1
    const {style, score, parts, onFinish, ...rest} = props

    const finishMinigame = () => {
    	const finalScore = 200
    	onFinish(finalScore)
    }

    /* Aquí se itera el arreglo "parts" para mostrar la imagen de cada uno. Cuando se renderea con una
    iteracion, React pide que cada elemento tenga un "key" único. En este caso, se está usando el índice
    del elemento en el arreglo.
    No le estoy poniendo width/height a las imagenes, pero se podría hacer. */
    return (
        <div style={{...style, backgroundColor:"green", color:"white", height:"100%"}}>
            Minigame 2. Score: {score}
            { parts.map( (part,i) => <img key={i} src={part} />) }
            <button onClick={finishMinigame}>
			  Finish
			</button>
        </div>
    )
}