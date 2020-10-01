import React from 'react';
import logo from './logo.svg';
import Map2D from './components/map'
import Log from './components/log'
import './App.css';

function App() {
  return (
    <div style={{display: "flex", flexDirection:"row"}}>
      <div style={{flex:1}}>
        <Map2D />
      </div>
      <div style={{flex:1}}>
        <Log />
      </div>
    </div>
  )
}

export default App
