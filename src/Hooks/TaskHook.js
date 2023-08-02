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
        pomodorosEnd : 0
    }],
    active : false,
    addTask : ()=>{
    },
    changeStatus : ()=>{
    },
    changeActive:()=>{
    },
    updatePomodoros : ()=>{},
    deleteTask : (index)=>{}
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
            setTasks(task => [...task, {nombre : data.nombre, descripcion : data.descripcion || '', seleccionado : true, terminado: false, prioridad : data.prioridad, duracion: data.duracion,pomodoros : data.pomodoros, pomodorosEnd:0}]);
            return;
        }
        setTasks(task => [...task, {nombre : data.nombre, descripcion : data.descripcion || '', seleccionado : false, terminado: false, prioridad : data.prioridad, duracion: data.duracion,pomodoros : data.pomodoros, pomodorosEnd:0}]);
    }
    function deleteTask(index) {
        let nombreActual = tasks[index].nombre
        setTasks(current=>current.filter((task)=>task.nombre!==nombreActual));
    }
    function changeStatus(posActual) {
        let oldArr = [...tasks]
        let posCount =0
        let posSeleccionado = oldArr.map((val)=>{
            if (val.seleccionado) {
                return posCount
            }
            posCount+=1;
            return 0;
        }).reduce((acumluador,current)=>acumluador+current);
        oldArr[posSeleccionado].seleccionado = false
        oldArr[posActual].seleccionado = true
        setTasks(oldArr);
    }
    function changeActive() {
        setActive(!active)
    }
    function changeTime(pos) {
        let oldArr = [...times]
        let posi = oldArr.filter((el)=>el.isSelected)[0].pos
        oldArr[posi].isSelected = false
        oldArr[pos].isSelected = true
        setTimeValue(defaultTime[pos].time)
        setConstant(0)
        setTimes(oldArr);
    }
    function changeTimerDuration(duration) {
        setTimeValue(duration);
        setConstant(0);
    }
    function startTimer() {
        const arr_time = [...times].filter((el)=>el.isSelected)[0];
        const c = arr_time.constant
        const pos = arr_time.pos
        setTimeValue(defaultTime[pos].time);
        return setInterval(()=>{
            setTimeValue(val=>val-1);
            setConstant(val=>val+c);    
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
    return (
        <ContextTask.Provider value={{tasks, deleteTask, addTask, changeStatus, updatePomodoros, changeActive, active}} >
            <ContextTime.Provider value={{times, changeTime, startTimer, timeValue, constant, resetTime, changeTimerDuration}}>
                {children}
            </ContextTime.Provider>
        </ContextTask.Provider>
    )
}