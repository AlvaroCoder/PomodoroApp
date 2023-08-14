import React, { useState } from 'react'
import { useTask, useTime } from '../Hooks/TaskHook';
function Task({data,index, deleteTask}) {
    const taskContext = useTask();
    const timerContext = useTime();
    const {nombre,descripcion, prioridad,seleccionado, duracion, pomodoros, pomodorosEnd} = data
    const [copiado, setCopiado] = useState(false);
    const handleClick =(e)=>{
        e.preventDefault();
        taskContext.changeStatus(index);
        timerContext.changeTimerDuration(duracion);
    }
     const copyText = async (text)=>{
        if ('clipboard' in navigator) {
            return await navigator.clipboard.writeText(text)
        }else{
            return document.execCommand('copy',true, text);
        }
    }
    const handleClickDescripcion =()=>{
        copyText(descripcion)
        .then(()=>{
            setCopiado(true);
            setTimeout(()=>{
                setCopiado(false);
            },1500)
        }).catch((err)=>{
            console.log(err);
        })
    }
  return (
    <div id={seleccionado ? 'task-selected':''} className='task' >
        <div className='sec-icons'>
            <div className='check'>
                <i className='bx bx-check active'></i>
            </div>
            <div className='delete' onClick={deleteTask}>
                <i className='bx bxs-trash-alt'></i>
            </div>
        </div>          
        <div onClick={handleClick}>
            <div className='task-top' >
                <div className='task-color'>
                    <div id={prioridad} className='circle'>
                    </div>
                </div>
                <div className='task-name'>
                    <p className='name'>{nombre}</p>
                    <p className='duration'>{duracion/60} min</p>
                </div>
                <div className='pomodoros-task'>
                    <p><span className='pomEnd'>{pomodorosEnd}</span>/{pomodoros}</p>
                </div>
            </div>
            {descripcion !=='' && <div onClick={handleClickDescripcion} className='task-bottom'>
                {copiado ? <div className='success'>
                    <p>Copiado !</p>
                </div> : null}
                <p>{descripcion}</p>
            </div>}
        </div>
    </div>
  )
}

export default Task;