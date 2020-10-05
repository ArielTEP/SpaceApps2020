import React from 'react'

export default function Design(props) {

    const {id, className} = props;

    return (
        <canvas
            id = {id}
            className = {className}
        />
    )
}
