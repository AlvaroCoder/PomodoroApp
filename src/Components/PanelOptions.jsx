import { useTask } from "../Hooks/TaskHook";

function Option({data}) {
    const {nombre,icon,func} = data;
    return (
        <li className="option" onClick={func}>
            <i class={icon}></i>
            <span>
                {nombre}
            </span>
        </li>
        )
}

function PanelOptions({active}) {
    const {deleteAll, filterByUrgency} = useTask();
    const options = [{'nombre':"Filtrar por Importancia", 'icon':'bx bx-filter', 'func':filterByUrgency }, {'nombre':"Eliminar Todo",'icon':"bx bx-trash", 'func':deleteAll}]
    if (active) {
        return <div className='options-box'>
            <ul className='list-options'>
                {options.map((val,idx)=><Option key={idx} data={val} />)}
            </ul>
        </div>
    }
    return null;
}
export default PanelOptions;