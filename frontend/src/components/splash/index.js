import React from 'react';
import './index.css';

const warp_dive = {
    id: 6,
    name: "WARP DRIVE",
    descripcion: "Remember Star Trek? Miguel Alcubierre theorised that it is possible to navigate through the universe by folding the space-time right behind you to create thrust. It should be possible to travel faster than the speed of light and, well, according to Einstein's equations... it should work!",
    image: "/spacecrafts/sc1.png",
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

const PROPULSION_SYSTEMS = [
  warp_dive
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
        <div style={{display:"flex", flexDirection:"row", padding:"0px 150px 0px 150px"}}>
          <div style={{flex:1, marginRight:"15px"}}>
            <p>
              Go on a journey is starting from designing and making your own spacecraft from scratch to travelling accross the universe trying to survive!
              <ol>
                <li>Draw the parts you need to build a {propulsionObject.name} </li>
                <li>Assemble the parts to begin the journey</li>
                <li>Survive travelling through the universe</li>
              </ol> 
            </p>
            <p>
              Your propulsion system for this journey is going to be <b>{propulsionObject.name}</b>! Click button to start <br/>
            </p>
            <button onClick={() => {onReady(propulsionObject)} }>I wanna go on an adventure</button>
          </div>
          <div className="card" style={{flex:1, backgroundColor:"white", marginLeft:"15px"}}>
            <div className="card-title">{propulsionObject.name}</div>
            <div className="card-container">
              {propulsionObject.descripcion} <br/>
              <img src={propulsionObject.image} height="500" />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Splash
