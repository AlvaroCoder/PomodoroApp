import React, {useState} from 'react'
import { useTask } from '../Hooks/TaskHook';

function AddTask() {
  const tasks = useTask();
  const [data, setData] = useState({
    title : '',
    description : ''
  })
  const [index, setIndex] = useState(1);
  const [status, setStatus] = useState(false);
  const [pomodoros, setPomodoros] = useState(1);
  const handleChange =(evt)=>{
    evt.preventDefault();
    const target = evt.target
    setData({
      ...data,
      [target.name] : target.value
    })
  }
  const addTaskNew = (evt)=>{
    evt.preventDefault();
    if (data.title === "" ) return alert('Completa el formulario');
    setIndex(index+1);
    tasks.addTask(data, index, pomodoros);
    setData({title : '', description : ''})
  }
  const changeStatus=(evt)=>{
    setStatus(!status)
  }
  const addPomodoro = (evt)=>{
    evt.preventDefault();
    setPomodoros(el=>el+1)
  }
  const substractPomodoro = (evt)=>{
    evt.preventDefault();
    setPomodoros(el=>el-1)
  }
  return (
    <div className='ctn-btn-add'>
      <div id={!status ? `active`:'inactive'} onClick={changeStatus} className='btn-add-task'>
        <p>Agregar Nueva Tarea</p>
      </div>
      <div id={status ? `active`:'inactive'} className="ctn-details">
        <label className='box-details'>
          <span>Titulo</span> 
          <input name='title' value={data.title} className='input-task' onChange={handleChange} ></input>
        </label>
        <section id='sec-pomodoros'>
          <span >Pomodoros</span> <p style={{marginLeft:"15px"}}>{pomodoros}</p> <button className='btn-pomodoro' onClick={addPomodoro}>+</button> {pomodoros > 1 && <button className='btn-pomodoro' onClick={substractPomodoro}>-</button>}
        </section>
        <label className='box-details'>
          <span>Descripcion</span> <textarea onChange={handleChange} name='description' value={data.description} className='input-task'></textarea>
        </label>
        <section id='sec-btns'>
          <button id='cancel-task' className='btn-task' onClick={changeStatus}>Cancelar</button>
          <button id='save-task' className='btn-task' onClick={addTaskNew}>Agregar</button>
        </section>
      </div>
    </div>
  )
}

export default AddTask;