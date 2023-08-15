import { createContext, useContext, useState } from "react";
const defaultTime = [
    {time : 1500, isSelected : true, pos : 0,name : 'Pomodoro', constant : 0.067},
    {time : 300, isSelected : false, pos : 1,name : 'Descanso Corto', constant : 0.33},
    {time : 900, isSelected : false, pos : 2,name : 'Descanso Largo', constant : 0.11}
]

export const ContextTask = createContext({
    tasks : [{
        pos : 0,
        nombre : "",
        description : "",
        terminado : false,
        prioridad : 0,
        duracion : 0,
        seleccionado : false,
        pomodoros : 0,
        pomodorosEnd : 0,
        pausa : false
    }],
    active : false,
    addTask : ()=>{
    },
    changeStatus : ()=>{
    },
    changeActive:()=>{
    },
    updatePomodoros : ()=>{},
    incrementFinishPom : ()=>{},
    deleteTask : (index)=>{},
    deleteAll : ()=>{},
    filterByUrgency : ()=>{},
    filterByTime : ()=>{}
});
export const ContextTime = createContext({
    times : [
        {time : 1500, isSelected : true, pos : 0,name : 'Pomodoro', constant : 0.067},
        {time : 300, isSelected : false, pos : 1,name : 'Descanso Corto', constant : 0.33},
        {time : 900, isSelected : false, pos : 2,name : 'Descanso Largo', constant : 0.11}
    ],
    changeTime : ()=>{
    },
    changeTimerDuration : ()=>{},
    startTimer : ()=>{
    },
    resetTime : ()=>{
    },
    timeValue : 0,
    constant : 0
})
export function useTask() {
    return useContext(ContextTask);
}
export function useTime() {
    return useContext(ContextTime);
}
export default function TaskContext({children}) {
    const [tasks, setTasks] = useState([]);
    const [constant, setConstant] = useState(0);
    const [times, setTimes] = useState(defaultTime);
    const [timeValue, setTimeValue] = useState(1500);
    const [active, setActive] = useState(false);
    function addTask(data) {
        if(tasks.length === 0){
            setTasks(task => [...task, {nombre : data.nombre, descripcion : data.descripcion, seleccionado : true, terminado: false, pausa : false,prioridad : data.prioridad, duracion: data.duracion,pomodoros : data.pomodoros, pomodorosEnd:0}]);
            return;
        }
        setTasks(task => [...task, {nombre : data.nombre, descripcion : data.descripcion, seleccionado : false, terminado: false, pausa : false,prioridad : data.prioridad, duracion: data.duracion,pomodoros : data.pomodoros, pomodorosEnd:0}]);
    }
    function deleteTask(index) {
        setTasks(current=>{
            return current.filter((_,idx)=>idx!==index);
        });
    }
    function deleteAll() {
        setTasks([])
    }

    function filterByUrgency() {
        const highTasks = tasks.filter((val)=>val.prioridad === 'red');
        const midTasks = tasks.filter((val)=>val.prioridad === 'yellow');
        const lowTasks = tasks.filter((val)=>val.prioridad === 'green');
        const newListTask = highTasks.concat(midTasks, lowTasks)
        setTasks(newListTask);
    }
    function filterByTime() {
        let oldListTasks = [...tasks]
        let pivot = oldListTasks[oldListTasks.length-1].duracion
        let lowTasks = oldListTasks.filter((val)=>val.duracion< pivot);
        let highTasks = oldListTasks.filter((val)=>val.duracion>= pivot);
        const newListTask = highTasks.concat(lowTasks)
        console.log(newListTask);
        setTasks(newListTask)
    }
    function changeStatus(posActual) {
        const newArr = tasks.map((val, index)=>{
            if (index===posActual) {
                return {'nombre' : val.nombre, 'descripcion' : val.descripcion , 'seleccionado' : true, 'terminado': false, 'prioridad' : val.prioridad, 'pausa':false,'duracion': val.duracion,'pomodoros' : val.pomodoros, 'pomodorosEnd':0}
            }
            return {'nombre' : val.nombre, 'descripcion' : val.descripcion , 'seleccionado' : false, 'terminado': false, 'prioridad' : val.prioridad, 'pausa':false ,'duracion': val.duracion,'pomodoros' : val.pomodoros, 'pomodorosEnd':0}

        })
        setTasks(newArr);
    }
    function changeActive() {
        setActive(!active)
    }
    function changeTime(pos) {
        const newArr = times.map((val,index)=>{
            if (index===pos) {
                return {time : val.time, isSelected : true, pos : val.pos,name : val.name, constant : val.constant}
            }
            return {time : val.time, isSelected : false, pos : val.pos,name : val.name, constant : val.constant}

        });
        const stillSelectd = tasks.filter((val)=>val.seleccionado)
        if (stillSelectd[0]) {
            const taskSelected =  tasks.filter((val)=>val.seleccionado)[0].nombre
            const newListTask = tasks.map((val)=>{
                if (val.nombre ===  taskSelected) {
                    return {nombre : val.nombre, descripcion : val.descripcion , seleccionado : false,pausa : true, terminado: false, prioridad : val.prioridad, duracion: val.duracion,pomodoros : val.pomodoros, pomodorosEnd:val.pomodorosEnd}
                }
                return {nombre : val.nombre, descripcion : val.descripcion , seleccionado : false, pausa : false,terminado: false, prioridad : val.prioridad, duracion: val.duracion,pomodoros : val.pomodoros, pomodorosEnd:val.pomodorosEnd}
    
            });
            setTasks(newListTask);
        }
        setTimeValue(defaultTime[pos].time)
        setConstant(0)
        setTimes(newArr);
    }
    function changeTimerDuration(duration) {
        setTimeValue(duration);
        setConstant(0);
    }
    function startTimer() {
        const timeSelected = tasks[0]  ? tasks.filter((val)=>val.seleccionado)[0] ?  tasks.filter((val)=>val.seleccionado)[0].duracion : times.filter((el)=>el.isSelected)[0].time :  times.filter((el)=>el.isSelected)[0].time;
        const constantTime = 100 / timeSelected
        setTimeValue(timeSelected);
        return setInterval(()=>{
            setTimeValue(val=>val-1);
            setConstant(val=>val+constantTime);    
        }, 1000);
    }
    function resetTime() {
        clearInterval(startTimer())
        const arr_time = [...times].filter((el)=>el.isSelected)[0];
        const pos = arr_time.pos
        setTimeValue(defaultTime[pos].time)
        setConstant(defaultTime[pos].constant)
    }
    function updatePomodoros() {
        const arr = [...tasks]
        const pos = arr.filter(el=>el.seleccionado)[0].pos
        if (arr[pos].pomodorosEnd < arr[pos].pomodoros) {
            arr[pos].pomodorosEnd+=1
            setTasks(arr);    
        }
    }
    function incrementFinishPom() {
        const nameTask = tasks.filter((val)=>val.seleccionado)[0].nombre;
        const newListTask = tasks.map((val)=>{
            if (val.nombre === nameTask) {
                return {nombre : val.nombre, descripcion : val.descripcion , seleccionado : true, pausa : false,terminado: false, prioridad : val.prioridad, duracion: val.duracion,pomodoros : val.pomodoros, pomodorosEnd:val.pomodorosEnd+1}
            }
            return {nombre : val.nombre, descripcion : val.descripcion , seleccionado : false, pausa : false,terminado: false, prioridad : val.prioridad, duracion: val.duracion,pomodoros : val.pomodoros, pomodorosEnd:val.pomodorosEnd}
        });
        setTasks(newListTask);
    }
    return (
        <ContextTask.Provider value={{tasks, deleteTask, addTask, changeStatus, updatePomodoros, changeActive, active, incrementFinishPom, filterByTime, filterByUrgency, deleteAll}} >
            <ContextTime.Provider value={{times, changeTime, startTimer, timeValue, constant, resetTime, changeTimerDuration}}>
                {children}
            </ContextTime.Provider>
        </ContextTask.Provider>
    )
}