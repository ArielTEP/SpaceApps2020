import React, {useState, useEffect} from "react";
import { useTimer } from 'react-timer-hook';
import Piece from './Piece';
import WorkTable from './WorkTable';
import Conveyor from './Conveyor';
import './minigame2.css';


var t = 0;

function calculate_arrays(Parts) {
    const TopParts = [];
    const BottomParts = [];
    const LeftParts = [];
    const RightParts = [];

    for(var i = 0; i < Parts.length; i++) {
        var n = Math.random() * 100;
        console.log(i);
        if(n < 40) {
            TopParts.push(Parts[i]);
        } else if(n < 80) {
            BottomParts.push(Parts[i]);
        } else if(n < 90) {
            LeftParts.push(Parts[i]);
        } else {
            RightParts.push(Parts[i]);
        }

    }
    return [TopParts, BottomParts, LeftParts, RightParts]
}

function get_expiry_timestamp(seconds) {
    const time = new Date()
    time.setSeconds(time.getSeconds() + seconds)
    return time;
}

export default function MinigameTwo(props) {
    // parts = [ {id, url} ]
    // originalParts = [ {id, url} ]
    const {score, onFinish, parts, originalParts} = props;
    const [score2, setScore2] = useState(score);
    const [CalculatedParts, setCalculatedParts] = useState([ [],[],[],[] ])
    const [goodParts, setGoodParts] = useState(0);

    const { seconds, restart } = useTimer({ 
                // 5 seconds * part
                expiryTimestamp: get_expiry_timestamp(5*originalParts.length),
                onExpire: () => finishMinigame(score2) 
            });

    useEffect(() => {
        setCalculatedParts( calculate_arrays(parts) )
        setGoodParts(originalParts.length)
    }, [])

    const calculatePieces = (piece) => {
        console.log("Validate " + piece);
        var valid = false;
        setScore2(score2 - 50);
        if(piece.includes(originalParts[t].id)) {
            valid = true;
            setScore2(score2 + 100);
            // calculate amount of parts left
            const partsLeft = goodParts - 1
            setGoodParts(partsLeft)
            t++;
            if(partsLeft == 0) {
                finishMinigame(score2+100+seconds);
            }
        }
        return valid;
    }

    const finishMinigame = (receivedScore) => {
        setScore2(receivedScore);
    	onFinish(receivedScore);
    }

    /* Aquí se itera el arreglo "parts" para mostrar la imagen de cada uno. Cuando se renderea con una
    iteracion, React pide que cada elemento tenga un "key" único. En este caso, se está usando el índice
    del elemento en el arreglo.
    No le estoy poniendo width/height a las imagenes, pero se podría hacer. */
    const [TopParts, BottomParts, LeftParts, RightParts] = CalculatedParts
    return (
        <div className="minigame2">
            <p>Score: {score2} Time: {seconds}</p>
            <Conveyor id="topConveyor" className="top-conveyor">
                { TopParts.map((part, i) => <CreatePiece id={part.id} key={i} srcPart ={part.url} />) }
            </Conveyor>
            <div className="middleGame">
                <Conveyor id="leftConveyor" className="left-conveyor">
                    { LeftParts.map((part, i) => <CreatePiece id={part.id} key={i} srcPart ={part.url} />) }
                </Conveyor>
                <div className="floor">
                    <img src={originalParts[t].base} draggable="false" className="Blueprint"/>
                    <WorkTable 
                        id="WorkTable" 
                        className="workTable" 
                        calculatePieces={calculatePieces}/>
                </div>
                <Conveyor id="rightConveyor" className="right-conveyor">
                    { RightParts.map((part, i) => <CreatePiece id={part.id} key={i} srcPart ={part.url} />) }                
                </Conveyor>
            </div>
            <Conveyor id="bottomConveyor" className="bottom-conveyor">
                { BottomParts.map((part, i) => <CreatePiece id={part.id} key={i} srcPart ={part.url} />) }
            </Conveyor>
        </div>
    )
}

function CreatePiece(props) {
    return(
        
        <Piece 
            id={props.id}
            className="piece"
            draggable="true"
            srcImage={props.srcPart}
        />
    );
}