import React, {useState, useEffect} from 'react'
import { CircularProgress, createTheme, ThemeProvider } from '@mui/material';
import {  useTask, useTime } from '../Hooks/TaskHook';

let s;
function Timer({title}) {
  const {incrementFinishPom} = useTask();
  const { timeValue,constant,startTimer, resetTime } = useTime();
  const [start, setStart] = useState(false);
  
  useEffect(() => {
    if (start) {
      s = startTimer();
    } 
    if (!start) {
      clearInterval(s);
    }
  }, [start]);

  useEffect(() => {
    if (timeValue <= 0) {
      setStart(s=> !s);
      resetTime();
      incrementFinishPom()
    }
  }, [timeValue])
  
  const theme =createTheme({
    palette:{
      neutral : {
        main : "#FFFFFF"
      }
    }
  });

  const changeStart =(evt)=>{
    evt.preventDefault();
    setStart(s=>!s);
  }
  const changeReset = (evt)=>{
    evt.preventDefault();
    setStart(s=>!s);
    resetTime();
  }
  return (
    <div className='container-timer'>
      <div className='timer-title'>
        <h1 className='title-timer'>{title}</h1>
      </div>
      <div className='timer'>
        <ThemeProvider theme={theme}>
          <CircularProgress
            thickness={1}
            color="neutral"
            variant={'determinate'}
            value={100-(constant)}
            size={320}
          />
        </ThemeProvider>
        <div className='container-label-timer'>
          <p className='label-timer'>{`${Math.floor(timeValue/60).toString().padStart(2,'0')}:${Math.floor(timeValue%60).toString().padStart(2,'0')}`}</p>
        </div>
      </div>
      <div className='timer-buttons'>
        {
          start ? 
          <div>
            <button id='button-stop' onClick={changeStart}><i class='bx bx-pause icon-btn'></i></button> 
            <button id='button-reset' onClick={changeReset}><i class='bx bxs-square icon-btn'></i></button>
          </div>
          : <div>
            <button id='button-play' onClick={changeStart}><i class='bx bx-play icon-btn'></i></button> 
              </div>
        }
      </div>
    </div>
  )
}

export default Timer;