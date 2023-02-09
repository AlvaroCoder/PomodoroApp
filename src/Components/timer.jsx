import React, {useState, useEffect} from 'react'
import { CircularProgress, createTheme, ThemeProvider } from '@mui/material';
import { useTask, useTime } from '../Hooks/TaskHook';

let s;
function Timer({title}) {
  const { timeValue,constant,startTimer, resetTime } = useTime();
  const { updatePomodoros } = useTask();
  const [start, setStart] = useState(false);
  
  useEffect(() => {
    if (start ) {
      s = startTimer();
    } 
    if (!start) {
      clearInterval(s);
    }
  }, [start]);

  useEffect(() => {
    if (timeValue <= 0) {
      setStart(s=> !s)
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
    console.log(start);
  }
  const changeReset = (evt)=>{
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
            thickness={2}
            color="neutral"
            variant={'determinate'}
            value={100-(constant)}
            size={250}
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
            <button id='button-stop'><p id='pause' onClick={changeStart} >PAUSE</p></button> 
            <button id='button-reset' onClick={changeReset}><p id='reset'>RESET</p></button>
          </div>
          : <div>
            <button id='button-play' onClick={changeStart}><p id='play'>PLAY</p></button> 
              </div>
        }
      </div>
    </div>
  )
}

export default Timer;