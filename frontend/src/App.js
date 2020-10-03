import React, {useState, useEffect} from 'react';
import logo from './logo.svg';
import MinigameOne from './components/minigame1'
import MinigameTwo from './components/minigame2'
import MinigameThree from './components/minigame3'
import Leaderboard from './components/leaderboard'
import './App.css';

function App() {

  const [score, setScore] = useState(0)
  const [currentGame, goToGame] = useState(1)

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
        {currentGame === 1 && <MinigameOne onFinish={onMinigameOneFinishes} /> }
        {currentGame === 2 && <MinigameTwo onFinish={onMinigameTwoFinishes} score={score} /> }
        {currentGame === 3 && <MinigameThree onFinish={onMinigameThreeFinishes} score={score} /> }
        {currentGame === 4 && <Leaderboard score={score} />  }
      </div>
    </div>
  )
}

export default App
