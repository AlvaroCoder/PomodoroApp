import React from 'react'

function NavBar() {
  return (
    <nav>
      <div className='ctn-items-nav'>
        <div className='title-nav'>
          Pomo Study
        </div>
        <div className='items-nav'>
          <ul>
            <li className='item'><span><i class='bx bxs-report'></i></span></li>
            <li className='item'><span><i class='bx bx-cog'></i></span></li>
            <li className='item'><span><i class='bx bxs-user-circle'></i></span></li>
          </ul>
        </div>
      </div>
    </nav>
    )
}

export default NavBar;