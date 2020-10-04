import React, {useState, useEffect} from "react"

export default function Leaderboard(props) {
    const {style, score, ...rest} = props

    return (
        <div style={{...style, backgroundColor:"black", color:"white", height:"100%", textAlign:"center"}}>
        	<h1>LEADERBOARDS</h1>
        	<h2>Coming Soon!</h2>
        	<p> Thanks for playing! Your final score was {score} </p>
        </div>
    )
}