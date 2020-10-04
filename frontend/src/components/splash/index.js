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
          <div style={{flex:1, marginRight:"15px"}}>
            <p>
              Go on a journey against time is starting from designing and making your own spacecraft from scratch to travelling accross the universe trying to survive!
            </p>
            <ol>
              <li>Draw the parts you need to build a {propulsionObject.name} </li>
              <li>Assemble the parts to begin the journey</li>
              <li>Survive as long as you can without being destroyed</li>
            </ol> 
            <p>
              Your propulsion system for this journey is going to be <b>{propulsionObject.name}</b>! <br/> Do you think you can beat the clock?
            </p>
            <button onClick={() => {onReady(propulsionObject)} }>Let's do it</button>
          </div>
          <div className="card" style={{flex:1, backgroundColor:"white", marginLeft:"15px"}}>
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
