import React from 'react'
import { AddTask, Footer, PomodoroTitle, Timer } from '../Components';
import { useTask } from '../Hooks/TaskHook';
import PanelTask from './PanelTask';

function PanelTimer() {
  const taskHook = useTask()
  const taskList = taskHook.tasks
  const title = taskList[0] ? taskList.filter((val)=>val.seleccionado).length > 0 ? taskHook.tasks.filter(val=>val.seleccionado)[0].nombre : "Empecemos" : 'Empecemos';
  return (
    <div className='panel-timer'>
        <PomodoroTitle></PomodoroTitle>
        <Timer title={title}></Timer>
        <PanelTask></PanelTask>
        <AddTask></AddTask>
        <Footer></Footer>
    </div>
  )
}

export default PanelTimer;