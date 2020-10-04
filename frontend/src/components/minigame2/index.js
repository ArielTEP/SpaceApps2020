import React, {useState} from "react";
import { useTimer } from 'react-timer-hook';
import Piece from './Piece';
import WorkTable from './WorkTable';
import Conveyor from './Conveyor';
import './minigame2.css';

    const Parts = [];
    Parts[0] = '/minigame2/assets/spacecraft/sc1.png';
    Parts[1] = '/minigame2/assets/spacecraft/s2.png';
    Parts[2] = '/minigame2/assets/spacecraft/sc3.png';
    Parts[3] = '/minigame2/assets/spacecraft/sc4.png';
    Parts[4] = '/minigame2/assets/spacecraft/sc5.png';
    Parts[5] = '/minigame2/assets/spacecraft/sc6.png';

    const ValidParts = [];
    ValidParts[0] = Parts[0];
    ValidParts[1] = Parts[2];
    ValidParts[2] = Parts[4];
    /*ValidParts[0] = '/minigame2/assets/spacecraft/parts_sc1/sc1p1.png';
    ValidParts[1] = '/minigame2/assets/spacecraft/parts_sc1/sc1p2.png';
    ValidParts[2] = '/minigame2/assets/spacecraft/parts_sc1/sc1p3.png';*/

    var goodParts = ValidParts.length;
    var t = 0;

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

function get_expiry_timestamp(seconds) {
    const time = new Date()
    time.setSeconds(time.getSeconds() + seconds)
    return time;
}

export default function MinigameTwo(props) {
    const {score, onFinish, ...rest} = props;
    const [score2, setScore2] = useState(score);

    const { seconds, restart } = useTimer({ 
                expiryTimestamp: get_expiry_timestamp(30),
                onExpire: () => finishMinigame() 
            });

    const calculatePieces = (piece) => {
        console.log("Validate " + piece);
        var valid = false;
        setScore2(score2 - 50);
        if(piece.includes(ValidParts[t])) {
            valid = true;
            setScore2(score2 + 100);
            goodParts--;
            t++;
            if(goodParts == 0)
                finishMinigame();
        }
        return valid;
    }

    const finishMinigame = () => {
        setScore2(score2 + seconds);
        const finalScore = score2
    	onFinish(finalScore);
    }

    return (
        <div className="minigame2">
            <p>Score: {score2} Time: {seconds}</p>
            <Conveyor id="topConveyor" className="top-conveyor">
                { TopParts.map((part, i) => <CreatePiece id={`part-image-top-${i}`} key={i} srcPart ={part} />) }
            </Conveyor>
            <div className="middleGame">
                <Conveyor id="leftConveyor" className="left-conveyor">
                    { LeftParts.map((part, i) => <CreatePiece id={`part-image-left-${i}`} key={i} srcPart ={part} />) }
                </Conveyor>
                <div className="floor">
                    <img src={ValidParts[t]} draggable="false" className="Blueprint"/>
                    <WorkTable 
                        id="WorkTable" 
                        className="workTable" 
                        calculatePieces={calculatePieces}/>
                </div>
                <Conveyor id="rightConveyor" className="right-conveyor">
                    { RightParts.map((part, i) => <CreatePiece id={`part-image-right-${i}`} key={i} srcPart ={part} />) }                
                </Conveyor>
            </div>
            <Conveyor id="bottomConveyor" className="bottom-conveyor">
                { BottomParts.map((part, i) => <CreatePiece id={`part-image-bottom-${i}`} key={i} srcPart ={part} />) }
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