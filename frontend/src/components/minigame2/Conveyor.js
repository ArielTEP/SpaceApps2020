import React from 'react'

export default function Conveyor(props) {
    
    const { id, className, children } = props;
    
    const drop = e => {
        e.preventDefault();
        const piece_id = e.dataTransfer.getData('piece_id'); 

        const piece = document.getElementById(piece_id);
        piece.style.display = 'block';

        e.target.appendChild(piece);
    }

    const dragOver = e => {
        e.preventDefault();
    }

    return (
        <div
            id = { id }
            className = { className }
            onDrop = { drop }
            onDragOver = { dragOver }
        >
            { children }
        </div>
    )
}