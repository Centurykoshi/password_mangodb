import React from 'react'

import './navbar.css'

export default function Navbar() {
  return (
    <>
    <div className='container_1'>
        <div className='Right'>
            <p> Locker </p>
        </div>
        <div className='Left'> 
            <p> Socials  </p>
         
            <div className='Left_hover'>
            <p> Github</p>
            <p> LinkDin</p>
            <p> LeetCode</p>
            </div>
        </div>
    </div>
    <div className='divider_container'>
    <div className='divider1'></div>
    </div>


    </>
  )
}
