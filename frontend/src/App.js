import React, {useState} from 'react';
import SplashScreen from './components/splash'
import MinigameOne from './components/minigame1'
import MinigameTwo from './components/minigame2'
import MinigameThree from './components/minigame3'
import Leaderboard from './components/leaderboard'
import './App.css';

// Store state of the spacecraft as the game passes
let spacecraft = {}

function App() {
  const [status, setStatus] = useState({score:0, currentGame:0})
  // Store the metadata of the propulsion system
  const [propulsionSystem, setPropulsionSystem] = useState(0)

  // Callback to start game
  const startGame = (randomPropulsionSystem) => {
    // propulsionSystem = randomPropulsionSystem
    setPropulsionSystem(randomPropulsionSystem)
    setStatus({score:0, currentGame:1})
  }

  // Callback for first minigame
  const onMinigameOneFinishes = (newScore, sketchedParts) => {
    // store the drawn parts of minigame 1
    spacecraft['parts'] = sketchedParts
    // update the current score and change game (this causes the next component to render)
    setStatus({score:newScore, currentGame:2})
  }

  // Callback for second minigame
  const onMinigameTwoFinishes = (newScore) => {
    // update the current score and change game (this causes the next component to render)
    setStatus({score:newScore, currentGame:3})
  }

  // Callback for third minigame
  const onMinigameThreeFinishes = (newScore) => {
    // update the current score and change game (this causes the next component to render)
    setStatus({score:newScore, currentGame:4})
  }

  const currentGame = status.currentGame
  const score = status.score
  return (
    <div style={{display: "flex", flexDirection:"row", height:"100vh"}}>
      <div style={{flex:1}}>
        {currentGame === 0 && <SplashScreen onReady={startGame} /> }
        {currentGame === 1 && <MinigameOne onFinish={onMinigameOneFinishes} spacecraft={propulsionSystem.minigame1} /> }
        {currentGame === 2 && <MinigameTwo originalParts={propulsionSystem.minigame1.parts} parts={spacecraft.parts} onFinish={onMinigameTwoFinishes} score={score} /> }
        {currentGame === 3 && <MinigameThree onFinish={onMinigameThreeFinishes} score={score} /> }
        {currentGame === 4 && <Leaderboard score={score} />  }
      </div>
    </div>
  )
}

export default App
