import React, {useState, useEffect} from "react"
import PropTypes from 'prop-types'

export default function Log(props) {
    const {style, ...rest} = props

    return (
        <div style={{...style, backgroundColor:"black", color:"white"}}>
            SOy el log
        </div>
    )
}