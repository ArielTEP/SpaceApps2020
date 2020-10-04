import React, { useState, useEffect } from 'react';
import Design from './Design';

export default function WorkTable(props) {
    
    const { id, className, children, calculatePieces} = props;
    const [resultSpaceCraft, setResultSpaceCraft] = useState("");
    const [draggingPostitionX, setDraggingPostitionX] = useState(0);
    const [draggingPostitionY, setDraggingPostitionY] = useState(0);
    const back1 = process.env.PUBLIC_URL + '/minigame2/assets/spacecraft/sc1.png';
    const back2 = process.env.PUBLIC_URL + '/minigame2/assets/spacecraft/sc3.png';

    const drop = e => {
        e.preventDefault();
        const piece_id = e.dataTransfer.getData('piece_id');
        const piece_src = e.dataTransfer.getData('piece_src');
        const piece_x = e.dataTransfer.getData('piece_x');

        const piece = document.getElementById(piece_id);
        piece.style.display = 'block';

        let ctx = document.getElementById("Canvas").getContext("2d");

        let Img = {};
        Img.pieza1 = document.createElement("img");
        Img.pieza1.src = piece_src;
        
        var img = document.createElement('img');
     
        Img.pieza1.onload = function () {
            ctx.drawImage (Img.pieza1,0,0, Img.pieza1.width, Img.pieza1.height,
                draggingPostitionX,draggingPostitionY - 50, 30,50 );
        };

        calculatePieces(piece_src);
        
        const model = document.getElementById("Design");
        piece.style.display = "none";
        model.appendChild(piece);
    }


    const dragOver = e => {
        const design = document.getElementById('Canvas');
        const rect = design.getBoundingClientRect();
        //console.log(rect.top, rect.right, rect.bottom, rect.left);

        //console.log(offset)
        //console.log((e.screenX - rect.left) +", " + (e.clientX - rect.left) )
        
        setDraggingPostitionX(e.screenX - rect.left - 30);
        setDraggingPostitionY(e.screenY - rect.top - 50);

        e.preventDefault();
    }

    return (
        <div
            id = { id }
            className = { className }
        >
            <div
                id = "Design"
                className = "designSpaceCraft"
                onDrop = { drop }
                onDragOver = { dragOver }
            >
                <Design
                    id = "Canvas"
                    className = "canvas"
                />
            </div>
        </div>
    )
}