import './App.css';
import Controls from './components/Controls/Controls';
import MainCanvas from './components/MainCanvas/MainCanvas';
import React, { useState } from 'react';
import CONTROLTYPES from './constants/controlTypes';

function App() {
  const [areControlsActive, setAreControlsActive] = useState(false);

  const [controlsState, setControlsState] = useState(
    {FPS: 5,
    animationRunning: true,
    songLoaderActive: true}
    );

  const updateControlsState = obj => {
    setControlsState(prevState => {
      const newState = {...prevState, ...obj};
      return newState;
    });
  }
  

  //Controls
  const controlRules = {
    FPS: {
      min: 1
    }
  }
  const controls = {
    FPS: {
      type: CONTROLTYPES.SLIDER,
      for: 'FPS',
      min: 1,
      max: 100,
      onChange: (event) => {
        if (+event.target.value < controlRules.FPS.min) {
          return;
        }
        updateControlsState({FPS: event.target.value});
      },
      label: 'FPS'
    },
    FPSnumber: {
      type: CONTROLTYPES.NUMBER,
      for: 'FPS',
      onChange: event => {
        if (+event.target.value < controlRules.FPS.min) {
          return;
        }
        updateControlsState({FPS: event.target.value})
      },
      min: 1
    },
    PLAYCONTROLS: {
      type: CONTROLTYPES.PLAYCONTROLS,
      for: 'animationRunning',
      STOP: {
        onClick: () => {
          updateControlsState({animationRunning: false})
        }
      },
      PLAY: {
        onClick: () => {
          updateControlsState({animationRunning: true});
        }
      }
    },
  }; 

  const activateControls = () => {
    setAreControlsActive((curState) => {
      return !curState;
    });
  };

  return (
    <div className="App">
      <MainCanvas controlsState={controlsState} config={{}}></MainCanvas>
      <Controls controlsState={controlsState} controls={controls} activateControls={activateControls} active={areControlsActive}> </Controls>
    </div>
  );
}

export default App;
