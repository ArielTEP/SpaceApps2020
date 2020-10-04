import React, {useState, useEffect} from 'react';

function Splash(props) {
  const {onReady} = props

  function chooseRandomPropulsionSystem() {
    const propulsionObject = {
      id: 6,
      minigame1 : {
        parts : [
          {
            base : "/minigame1/parts_sc6/sc6p0.png",
            target : "/minigame1/parts_sc6/sc6p0.target.png",
            targetWidth: 500,
            targetHeight: 500
          },
          {
            base : "/minigame1/parts_sc6/sc6p1.png",
            target : "/minigame1/parts_sc6/sc6p1.target.png",
            targetWidth: 205,
            targetHeight: 625
          },
          {
            base : "/minigame1/parts_sc6/sc6p2.png",
            target : "/minigame1/parts_sc6/sc6p2.target.png",
            targetWidth: 220,
            targetHeight: 650
          },
          {
            base : "/minigame1/parts_sc6/sc6p3.png",
            target : "/minigame1/parts_sc6/sc6p3.target.png",
            targetWidth: 230,
            targetHeight: 650
          },
          {
            base : "/minigame1/parts_sc6/sc6p4.png",
            target : "/minigame1/parts_sc6/sc6p4.target.png",
            targetWidth: 500,
            targetHeight: 780
          },
        ]
      }
    }
    return propulsionObject
  }

  const propulsionObject = chooseRandomPropulsionSystem()
  return (
    <div style={{display: "flex", flexDirection:"column", height:"100vh"}}>
      <div style={{flex:1}}>
        <p>
          Your propulsion system for this journey is going to be 6! Click button to start
        </p>
        <button onClick={() => {onReady(propulsionObject)} }>I wanna go on an adventure</button>
      </div>
    </div>
  )
}

export default Splash
