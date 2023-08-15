import React from 'react'
import { useTask } from '../Hooks/TaskHook';

function Footer() {
    const taskHook = useTask();
    const hayData = taskHook.tasks[0]
    const pomodorosTotal = hayData ? taskHook.tasks.map((val)=>val.pomodoros).reduce((acumulator, current)=>acumulator+current) : 0
    const pomos = taskHook.tasks.map((val)=>val.pomodoros)
    const duracion = hayData ? taskHook.tasks.map((val,index)=>val.duracion * pomos[index]).reduce((acumulator,current)=>acumulator+current)/3600 : 0
    const duracionH = Math.round(duracion*100)/100
    const pomsEnd = taskHook.tasks.map((val)=>val.pomodorosEnd);
    const sumPomsEnd = hayData ? pomsEnd.reduce((prev,current)=>prev+current,0) : 0;
    return (
    <section className='footer-timerTask'>
        <div className='ctn-items-footer'>
            <ul className='items-footer'>
                <li className='item'><span>Pomodoros : {sumPomsEnd}/{pomodorosTotal} </span></li>
                <li className='item'><span>Duracion : {duracionH}(h) </span></li>
            </ul>
        </div>
    </section>
    )
}

export default Footer;