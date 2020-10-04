import React, {useState} from "react";
import Piece from './Piece';
import WorkTable from './WorkTable';
import Conveyor from './Conveyor';
import './minigame2.css';

export default function MinigameTwo(props) {
    const {score, onFinish, ...rest} = props
    const part1 = process.env.PUBLIC_URL + '/minigame2/assets/spacecraft/sc1.png';

    const finishMinigame = () => {
    	const finalScore = 200
    	onFinish(finalScore)
    }

    return (
        <div className="minigame2">
            <Conveyor id="topConveyor" className="top-conveyor">
                <Piece 
                    id="piece-1" 
                    className="piece"
                    draggable="true"
                    srcImage={part1}
                />
                <Piece 
                    id="piece-2" 
                    className="piece"
                    draggable="true"
                    srcImage={part1}
                />
            </Conveyor>
            <div className="middleGame">
                <Conveyor id="leftConveyor" className="left-conveyor">
                    <Piece 
                        id="piece-3" 
                        className="piece"
                        draggable="true"
                        srcImage={part1}
                    />
                    <Piece 
                        id="piece-4" 
                        className="piece"
                        draggable="true"
                        srcImage={part1}
                    />
                    <Piece 
                        id="piece-5" 
                        className="piece"
                        draggable="true"
                        srcImage={part1}
                    />
                </Conveyor>
                <div className="floor">
                    <WorkTable id="WorkTable" className="workTable"/>
                </div>
                <Conveyor id="rightConveyor" className="right-conveyor">
                    <Piece 
                        id="piece-7" 
                        className="piece"
                        draggable="true"
                        srcImage={part1}
                    />
                </Conveyor>
            </div>
            <Conveyor id="bottomConveyor" className="bottom-conveyor">
                <Piece 
                    id="piece-8" 
                    className="piece"
                    draggable="true"
                    srcImage={part1}
                />
            </Conveyor>
        </div>
    )
}