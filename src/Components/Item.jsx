import React from "react";
function Item({listData, setListData,dataObj}) {
    const handleClick =(e)=>{
        e.preventDefault();
        let posActive = listData.filter(({index,active})=>active)[0].index - 1;
        let posActual = listData.filter(({index, active})=>listData[index-1]===dataObj)[0].index -1;
        let copyList = [...listData];
        copyList[posActive].active = false;
        copyList[posActual].active = true;
        setListData(copyList);
    }
    return <li id={dataObj.id ? dataObj.id : null} className={dataObj.active ? 'item active' : 'item'} onClick={handleClick}>
        {dataObj.name}
    </li>
}
export default Item;
