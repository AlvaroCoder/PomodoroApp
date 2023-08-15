import React, { useEffect, useRef, useState } from 'react'
import { useTask } from '../Hooks/TaskHook';
import {Item} from '../Components'
function generate1toN(n, activePos) {
    let listaNums = []
    for (let index = 1; index < n; index++) {
        let data = {index, name : index, active : false}
        if(index === activePos){    
            data['active'] = true
        }
        listaNums.push(data);        
    }
    return listaNums;
}

function PanelAdd() {
    const tasksHook = useTask()
    const nums1to10 = generate1toN(21,1)
    const nums1to100 = generate1toN(61,25)
    const refDragg = useRef(null);
    const refDragg2 = useRef(null);
    const [data10, setData10] = useState(nums1to10);
    const [data100, setData100] = useState(nums1to100);
    const [priotities, setPriotities] = useState([
        {index:1,name:'Alta',active:false,id:"red",value:0},
        {index:2,name:"Media",active:false,id:"yellow",value:1},
        {index:3,name:"Baja",active:true,id:"green",value:2}
    ]);
    const [isDragging1, setIsDragging1] = useState(false);
    const [isDragging2, setIsDragging2] = useState(false);
    const [active1, setActive1] = useState({'left':{'display':'none'}, 'rigth':{'display':'flex'}})
    const [active2, setActive2] = useState({'left':{'display':'flex'}, 'rigth':{'display':'flex'}})
    const [inputData, setInputData] = useState({nombre : '', descripcion:''});
    useEffect(()=>{
        refDragg2.current.scrollLeft = 1050
    },[])
    const dragging = (e)=>{
        if(!isDragging1) return;
        refDragg.current.scrollLeft -= e.movementX
    }
    const dragging2 = (e)=>{
        if(!isDragging2) return;
        refDragg2.current.scrollLeft -= e.movementX
    }
    const handleClick1 =(e)=>{
        e.preventDefault();
        let id = e.target.id;
        let maxWidth = refDragg.current.scrollWidth - refDragg.current.clientWidth;
        let moveScroll = refDragg.current.scrollLeft += id === 'rigth' ? 340 : -340
        let resLeft = moveScroll <= 0 ? {'display':'none'} : {'display':'flex'}
        let resRight = maxWidth - moveScroll <= 1 ? {'display':'none'} : {'display':'flex'}
        let ResObj = {'left':resLeft, 'rigth':resRight}
        setActive1(ResObj)
    }
    const handleClick2 =(e)=>{
        e.preventDefault();
        let id = e.target.id;
        let maxWidth = refDragg2.current.scrollWidth - refDragg2.current.clientWidth;
        let moveScroll = refDragg2.current.scrollLeft += id === 'rigth' ? 340 : -340
        let resLeft = moveScroll <= 0 ? {'display':'none'} : {'display':'flex'}
        let resRight = maxWidth - moveScroll <= 1 ? {'display':'none'} : {'display':'flex'}
        let ResObj = {'left':resLeft, 'rigth':resRight}
        setActive2(ResObj)
    }
    const cancelTask=(e)=>{
        e.preventDefault();
        tasksHook.changeActive()
    }
    const handleInput=(e)=>{
        e.preventDefault();
        const {name, value} = e.target;
        setInputData({...inputData, [name]:value})
    }
    const saveTaskData=(e)=>{
        e.preventDefault();
        let idPrioritie = priotities.filter((val)=>val.active)[0].id;
        let duracionTarea = data100.filter((val)=>val.active)[0].index * 60;
        let pomodoros = data10.filter((val)=>val.active)[0].index;
        let data2Send ={
            nombre : inputData.nombre,
            descripcion : inputData.descripcion,
            prioridad : idPrioritie,
            duracion : duracionTarea,
            pomodoros : pomodoros
        }        
        tasksHook.addTask(data2Send);
        tasksHook.changeActive();
        setInputData({nombre : '',descripcion:''})
    }
  return (
    <div className='container-panelAdd' style={{'display': tasksHook.active ? 'block':'none'}}>
        <div onClick={cancelTask} className='close-panel'>
            <i class='bx bx-x'></i>
        </div>
        <div className='container-add'>
            <div className='ctn-upAdd'>
                <div>
                    <h1>Nueva Tarea</h1>
                </div>
                <div className='ctn-inputAdd'>
                    <input required name='nombre' value={inputData.nombre} onChange={handleInput} className='inputAdd' placeholder='¿Que tareas vas a realizar?'></input>
                    <input name='descripcion' value={inputData.descripcion} onChange={handleInput} className='inputAdd' placeholder='Descripcion (opcional)'></input>
                </div>
            </div>
            <div className='ctn-prioridad'>
                <div className='title-ctn'>
                    <span>Prioridad</span>
                </div>
                <div className='tabs-prioridad'>
                    <ul className='prioridades'>
                        {priotities.map((el,index)=><Item key={index} dataObj={el} listData={priotities} setListData={setPriotities}></Item>)}
                    </ul>
                </div>
            </div>
            <div className='ctn-pomodoros'>
                <div className='title-ctn'>
                    <span>Ajustes</span>
                </div>
                <div className='ctn-ajustes'>
                    <div className='bar-info'>
                        <h2 className='title'>Pomodoros</h2>
                        <h2 className='info'>Intervalos</h2>
                    </div>
                    <div className='wrapper'>
                        <div onClick={handleClick1} style={active1.left} className='icon' ><i id='left'  className='bx bx-chevron-left'></i></div>
                        <ul ref={refDragg} onMouseDown={()=>setIsDragging1(true)} onMouseUp={()=>setIsDragging1(false)}  onMouseMove={dragging} className={`box-nums ${isDragging1 && 'dragging'}`}>
                            {data10.map((el,index)=><Item key={index} setListData={setData10} listData={data10} dataObj={el}></Item>)}
                        </ul>
                        <div onClick={handleClick1} style={active1.rigth} className='icon'><i id='rigth'  className='bx bx-chevron-right'></i></div>
                    </div>
                    <div className='bar-info'>
                        <h2 className='title'>Duracion de la Tarea</h2>
                        <h2 className='info'>Minutos</h2>
                    </div>
                    <div className='wrapper'>
                        <div className='icon' style={active2.left} onClick={handleClick2} ><i id='left' className='bx bx-chevron-left' ></i></div>
                        <ul ref={refDragg2}  onMouseDown={()=>setIsDragging2(true)} onMouseUp={()=>setIsDragging2(false)}  onMouseMove={dragging2} className={`box-nums ${isDragging2 && 'dragging'}`}>
                            {data100.map((el,key)=><Item key={key} setListData={setData100} listData={data100} dataObj={el}></Item>)}
                        </ul>
                        <div className='icon' style={active2.rigth} onClick={handleClick2}><i id='rigth' className='bx bx-chevron-right' ></i></div>
                    </div>
                </div>
            </div>
            <div className='footer-add'>
                <button id='cancel-btn' onClick={cancelTask}>Cancelar</button>
                <button id='save-btn' onClick={saveTaskData}>Guardar</button>
            </div>
        </div>
    </div>
  )
}

export default PanelAdd;