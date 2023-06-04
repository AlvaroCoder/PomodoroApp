import React from 'react'
import { useTime } from '../Hooks/TaskHook'
import Title from './Title';

function PomodoroTitle() {
  const arr = useTime().times
  return (
    <div className='ctn-pomodoro-title'>
      {
        arr.map((val,key)=>{
          return <Title key={key} name={val.name} isSelected={val.isSelected} pos={val.pos}></Title>  
        })
      }
    </div>
  )
}

export default PomodoroTitle;