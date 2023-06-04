import React from 'react'
import { Task } from '../Components';
import {  useTask } from '../Hooks/TaskHook';

function PanelTask() {
    const task = useTask();
  return (
    <section className='container-task'>
        <div className='container-task-title'>
            <h1>Pendientes {task.tasks.length}</h1>
        </div>
        <section className='section-task'>
            {
                task.tasks.map((val, key)=>{
                    return <Task key={key} data={val}/>
                })
            }
        </section>
    </section>
    )
}

export default PanelTask;