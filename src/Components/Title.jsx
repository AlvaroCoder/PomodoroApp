import React from 'react'
import { useTime } from '../Hooks/TaskHook';

function Title({name, pos, isSelected}) {
  const time = useTime();
  const handleClick = (e)=>{
    e.preventDefault();
    time.changeTime(pos)
  }
  return (
    <p className='item-title' id={isSelected ? 'item-title-active' : ''} onClick={handleClick}>
      {name}
    </p>
  )
}

export default Title;