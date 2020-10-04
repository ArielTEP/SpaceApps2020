import React, {useState} from 'react';
import SplashScreen from './components/splash'
import MinigameOne from './components/minigame1'
import MinigameTwo from './components/minigame2'
import MinigameThree from './components/minigame3'
import Leaderboard from './components/leaderboard'
import './App.css';

function App() {

  const [score, setScore] = useState(0)
  const [currentGame, goToGame] = useState(0)
  // Store the metadata of the propulsion system
  const [propulsionSystem, setPropulsionSystem] = useState(0)

  // Callback to start game
  const startGame = (randomPropulsionSystem) => {
    // propulsionSystem = randomPropulsionSystem
    setPropulsionSystem(randomPropulsionSystem)
    goToGame(1)
  }

  // Callback for first minigame
  const onMinigameOneFinishes = (newScore) => {
    // update the current score
    setScore(newScore)
    // change game (this causes the next component to render)
    goToGame(2)
  }

  // Callback for second minigame
  const onMinigameTwoFinishes = (newScore) => {
    // update the current score
    setScore(newScore)
    // change game (this causes the next component to render)
    goToGame(3)
  }

  // Callback for third minigame
  const onMinigameThreeFinishes = (newScore) => {
    // update the current score
    setScore(newScore)
    // change game (this causes the next component to render)
    goToGame(4)
  }

  return (
    <div style={{display: "flex", flexDirection:"row", height:"100vh"}}>
      <div style={{flex:1}}>
        {currentGame === 0 && <SplashScreen onReady={startGame} /> }
        {currentGame === 1 && <MinigameOne onFinish={onMinigameOneFinishes} spacecraft={propulsionSystem.minigame1} /> }
        {currentGame === 2 && <MinigameTwo onFinish={onMinigameTwoFinishes} score={score} /> }
        {currentGame === 3 && <MinigameThree onFinish={onMinigameThreeFinishes} score={score} /> }
        {currentGame === 4 && <Leaderboard score={score} />  }
      </div>
    </div>
  )
}

export default App
