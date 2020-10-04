import React from 'react';

export default function Piece(props) {
    
    const { id, className, draggable, srcImage } = props;
    var opacity = 1;

    const dragStart = e => {
        const target = e.target;

        e.dataTransfer.setData('piece_id', target.id);
        e.dataTransfer.setData('piece_src', target.src);
        e.dataTransfer.setData('piece_x', target.clientX);

        setTimeout(() => {
            target.style.opacity = 0.5;
        }, 0);
    }

    const dragOver = e => {
        e.stopPropagation();
    }

    const dropPiece = e => {
        e.target.style.opacity = 1;
    }

    return (
        <img
            id = { id }
            className = { className }
            draggable = { draggable }
            onDragStart = { dragStart }
            onDragOver = { dragOver }
            onDragEnd = { dropPiece }
            src = { srcImage }
            alt = { id }
            style = {{ opacity: `${opacity}` }}
        />
    );
}