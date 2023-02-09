import React from 'react'
import check_complete from '../Assets/Icons/check_complete.png';
import check_incomplete from '../Assets/Icons/check_incomplete.png';
import { useTask } from '../Hooks/TaskHook';
function Task({data}) {
    const taskContext = useTask();
    const {pos,nombre,description, seleccionado, terminado, pomodoros, pomodorosEnd} = data

    const handleClick =(e)=>{
        e.preventDefault();
        taskContext.changeStatus(pos);
    }
  return (
    <div id={seleccionado ? 'task-selected':''} className='task' onClick={handleClick}>
        <div className='task-top'>
            {terminado ?  <img className='icon' src={check_complete} alt='icon'></img> : <img className='icon' src={check_incomplete} alt='icon'></img>}
            <div className='task-name'>
                <p>{nombre}</p>
            </div>
            <div className='pomodoros-task'>
                <span>{pomodorosEnd}/{pomodoros}</span>
            </div>
        </div>
        {description !=='' && <div className='task-bottom'>
            <p>{description}</p>
        </div>}
        
    </div>
  )
}

export default Task;