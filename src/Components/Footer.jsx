import React from 'react'
import { useTask } from '../Hooks/TaskHook';

function Footer() {
    const taskHook = useTask();
    let hayData = taskHook.tasks[0]
    let pomodorosTotal = hayData ? taskHook.tasks.map((val)=>val.pomodoros).reduce((acumulator, current)=>acumulator+current) : 0
    let pomos = taskHook.tasks.map((val)=>val.pomodoros)
    let duracion = hayData ? taskHook.tasks.map((val,index)=>val.duracion * pomos[index]).reduce((acumulator,current)=>acumulator+current)/3600 : 0
    let duracionH = Math.round(duracion*100)/100
    return (
    <section className='footer-timerTask'>
        <div className='ctn-items-footer'>
            <ul className='items-footer'>
                <li className='item'><span>Pomodoros : 0/{pomodorosTotal} </span></li>
                <li className='item'><span>Duracion : {duracionH}(h) </span></li>
            </ul>
        </div>
    </section>
    )
}

export default Footer;