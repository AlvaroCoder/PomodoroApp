import React, { useEffect } from 'react'
import { Task } from '../Components';
import {  useTask } from '../Hooks/TaskHook';

function PanelTask() {
    const task = useTask();
    return (
    <section className='container-task'>
        <section className='section-task'>
            {task.tasks.map((val, key)=><Task key={key} index={key} data={val}/>)}
        </section>
    </section>
    )
}

export default PanelTask;