import React, {useState, useEffect} from "react"

export default function Leaderboard(props) {
    const {style, score, ...rest} = props

    return (
        <div style={{...style, backgroundColor:"white", color:"black", height:"100%"}}>
            Leaderboards. Final score {score}
        </div>
    )
}