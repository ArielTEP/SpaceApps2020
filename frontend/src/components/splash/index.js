import React from 'react';
import './index.css';

const PROPULSION_SYSTEMS = [
  {
    id: 6,
    name: "WARP DRIVE",
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
]

function Splash(props) {
  const {onReady} = props

  function chooseRandomPropulsionSystem() {
    let randomInteger = 1 + Math.floor(Math.random() * 6)
    return PROPULSION_SYSTEMS[0]
    // TODO: implementar los otros spacecrafts en el minijuego 1
    // return PROPULSION_SYSTEMS[randomInteger]
  }

  const propulsionObject = chooseRandomPropulsionSystem()
  return (
    <div className="splash-container">
      <div style={{flex:1}}>
        <h1>Propulsion Craft</h1>
        <p>
          TODO: poner instrucciones
        </p>
        <p>
          Your propulsion system for this journey is going to be <b>{propulsionObject.name}</b>! Click button to start <br/>
          TODO: poner una descripcion del {propulsionObject.name}
        </p>
        <button onClick={() => {onReady(propulsionObject)} }>I wanna go on an adventure</button>
      </div>
    </div>
  )
}

export default Splash
