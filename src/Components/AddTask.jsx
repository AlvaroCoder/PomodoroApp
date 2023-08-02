import React  from 'react'
import { useTask } from '../Hooks/TaskHook';

function AddTask() {
  const tasks = useTask();
  const handleClick =(e)=>{
    e.preventDefault();
    tasks.changeActive()
  }
  return (
    <div className='ctn-btn-add'>
      <div id='active' onClick={handleClick} className='btn-add-task'>
        <p><i class='bx bx-plus-circle'></i> Agregar Tarea</p>
      </div>
    </div>
  )
}

export default AddTask;