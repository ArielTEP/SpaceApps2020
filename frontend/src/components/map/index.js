import React, {useState, useEffect} from "react"
import PropTypes from 'prop-types'

export default function Map2D(props) {
    const {style, ...rest} = props

    return (
        <div style={{...style, backgroundColor:"red", color:"white"}}>
            Soy un mapita
        </div>
    )
}