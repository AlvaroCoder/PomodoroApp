import React,{useState} from 'react'
import { Task } from '../Components';
import {  useTask } from '../Hooks/TaskHook';
import {PanelOptions} from '../Components'


function PanelTask() {
    const task = useTask();
    const listTask = task.tasks;
    const [active, setActive] = useState(false);
    const changeActive=(evt)=>{
        evt.preventDefault();
        setActive(!active);
    }
    return (
    <section className='container-task'>
        <section className='section-options'>
            <h1>Tareas</h1>
            <div onClick={changeActive} className='options'>
                <i className='bx bx-dots-vertical-rounded opt'></i>
            </div>
            {<PanelOptions active={active}/> }
        </section>
        <section className='section-task'>
            {listTask.map((val, idx)=><Task key={idx} index={idx} data={val} deleteTask={()=>task.deleteTask(idx)}/>)}
        </section>
    </section>
    )
}

export default PanelTask;