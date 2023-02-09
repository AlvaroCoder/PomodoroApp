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
        seleccionado : false,
        pomodoros : 1,
        pomodorosEnd : 0
    }],
    addTask : ()=>{
    },
    changeStatus : ()=>{
    },
    updatePomodoros : ()=>{}
});
export const ContextTime = createContext({
    times : [
        {time : 1500, isSelected : true, pos : 0,name : 'Pomodoro', constant : 0.067},
        {time : 300, isSelected : false, pos : 1,name : 'Descanso Corto', constant : 0.33},
        {time : 900, isSelected : false, pos : 2,name : 'Descanso Largo', constant : 0.11}
    ],
    changeTime : ()=>{
    },
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
    const [tasks, setTasks] = useState([{
        pos : 0,
        nombre : 'asd',
        description : 'd',
        seleccionado : true,
        terminado : false,
        pomodoros : 1,
        pomodorosEnd : 0
    }]);
    const [constant, setConstant] = useState(0);
    const [times, setTimes] = useState(defaultTime);
    const [timeValue, setTimeValue] = useState(1500);
    function addTask(data, index, pomodoros) {
        setTasks(task => [...task, {pos: index,nombre : data.title, description : data.description || '', seleccionado : false, terminado: false, pomodoros : pomodoros, pomodorosEnd:0}])
    }
    function changeStatus(pos) {
        let oldArr = [...tasks]
        let posi = oldArr.filter((el)=>el.seleccionado)[0].pos
        oldArr[posi].seleccionado = false
        oldArr[pos].seleccionado = true
        setTasks(oldArr);
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
    function startTimer() {
        const arr_time = [...times].filter((el)=>el.isSelected)[0];
        const timeVal = arr_time.time
        const c = arr_time.constant
        const pos = arr_time.pos
        setTimeValue(defaultTime[pos].time);
        return setInterval(()=>{
            setTimeValue(val=>val-1);
            setConstant(val=>val+c);    
        }, 1000);
    }
    function resetTime() {
        setTimes(defaultTime)
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
        <ContextTask.Provider value={{tasks, addTask, changeStatus, updatePomodoros}} >
            <ContextTime.Provider value={{times, changeTime, startTimer, timeValue, constant, resetTime}}>
                {children}
            </ContextTime.Provider>
        </ContextTask.Provider>
    )
}