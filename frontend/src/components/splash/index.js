import React from 'react';
import './index.css';
import {PROPULSION_SYSTEMS} from "./engines.js"

function Splash(props) {
  const {onReady} = props

  function chooseRandomPropulsionSystem() {
    let randomInteger = Math.floor(Math.random() * 5)
    return PROPULSION_SYSTEMS[randomInteger]
  }

  const propulsionObject = chooseRandomPropulsionSystem()
  return (
    <div className="splash-container">
      <div style={{flex:1}}>
        <h1>Propulsion Craft</h1>
        <div style={{display:"flex", flexDirection:"row", padding:"0px 150px 0px 150px"}}>
          <div style={{flex:1, marginRight:"15px", backgroundColor:"#00000095", padding:"45px", borderRadius:"50px", lineHeight:1.5, textAlign:"left"}}>
            <p>
              Go on a journey against time is starting from designing and making your own spacecraft from scratch to travelling accross the universe trying to survive!
            </p>
            <br/>
            <p>
              1. Draw the parts you need to build a {propulsionObject.name} before you run out of time<br/>
              2. Assemble the parts to begin the journey. Drag and drop the part shown in the monitor to the workspace <br/>
              3. Survive as long as you can without being destroyed by meteorites. Move with WASD and shoot with a mouse click.<br/>
            </p>
            <br/>
            <p>
              Your propulsion system for this journey is going to be <b>{propulsionObject.name}</b>! <br/> Do you think you can beat the clock?
            </p>
            <br/>
            <button onClick={() => {onReady(propulsionObject)} }>Let's do it</button>
          </div>
          <div className="card" style={{flex:1, backgroundColor:"#00000095", marginLeft:"15px", paddingTop:"20px"}}>
            <div className="card-title">{propulsionObject.name}</div>
            <div className="card-container">
              {propulsionObject.description} <br/>
              <img src={propulsionObject.image} height="500" alt="propulsion system" />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Splash
