import React from 'react'
import { Task } from '../Components';
import {  useTask } from '../Hooks/TaskHook';

function PanelTask() {
    const task = useTask();
    const listTask = task.tasks;
    return (
    <section className='container-task'>
        <section className='section-task'>
            {listTask.map((val, idx)=><Task key={idx} index={idx} data={val} deleteTask={()=>task.deleteTask(idx)}/>)}
        </section>
    </section>
    )
}

export default PanelTask;