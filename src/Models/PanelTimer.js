import React from 'react'
import { AddTask, PomodoroTitle, Timer } from '../Components';
import { useTask } from '../Hooks/TaskHook';

function PanelTimer() {
  const taskContext = useTask().tasks;
  return (
    <div className='panel-timer'>
        <PomodoroTitle></PomodoroTitle>
        <Timer title={taskContext.filter(val=>val.seleccionado)[0].nombre}></Timer>
        <AddTask></AddTask>
    </div>
  )
}

export default PanelTimer;