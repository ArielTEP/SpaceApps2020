import React, { useState, useEffect } from 'react';
import Design from './Design';

export default function WorkTable(props) {
    
    const { id, className, children } = props;
    const [resultSpaceCraft, setResultSpaceCraft] = useState("");
    const [draggingPostitionX, setDraggingPostitionX] = useState(0);
    const [draggingPostitionY, setDraggingPostitionY] = useState(0);
    const back1 = process.env.PUBLIC_URL + '/minigame2/assets/spacecraft/sc1.png';
    const back2 = process.env.PUBLIC_URL + '/minigame2/assets/spacecraft/sc3.png';

    const drop = e => {
        e.preventDefault();
        const piece_id = e.dataTransfer.getData('piece_id');
        const piece_src = e.dataTransfer.getData('piece_src');

        const piece = document.getElementById(piece_id);
        piece.style.display = 'block';

        //setResultSpaceCraft("url('" + piece.src + "')");
        //piece.style.left = draggingPostitionX;
        //piece.style.top = draggingPostitionY;
        //piece.setAttribute("x", draggingPostitionX);

        let ctx = document.getElementById("Canvas").getContext("2d");

        let Img = {};
        Img.pieza1 = new Image();
        //Img.pieza1.src = piece_src;
        Img.pieza1.src = "/minigame2/assets/spacecraft/sc1.png";
        //Img.pieza1.src = process.env.PUBLIC_URL + "../../assets/assets/spacecraft/sc1.png";

        //Img.pieza1.src = "https://raw.githubusercontent.com/NestorPlasencia/pikachu-puzzle/master/9.png";

        console.log(Img.pieza1.src);
        console.log(draggingPostitionX);
        console.log(draggingPostitionY);

        /*ctx.drawImage(Img.pieza1,0,0, Img.pieza1.width, Img.pieza1.height,
                0,10,Img.pieza1.width, Img.pieza1.height);*/
        ctx.drawImage (Img.pieza1,0,0, Img.pieza1.width, Img.pieza1.height,
            draggingPostitionX-25,draggingPostitionY-50,100,100);
    }


    const dragOver = e => {
        const design = document.getElementById('Canvas');
        const rect = design.getBoundingClientRect();
        //console.log(rect.top, rect.right, rect.bottom, rect.left);

        //console.log(offset)
        //console.log((e.screenX - rect.left) +", " + (e.clientX - rect.left) )
        
        setDraggingPostitionX(e.screenX - rect.left - 50);
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