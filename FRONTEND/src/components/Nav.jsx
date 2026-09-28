import React from 'react'

const Nav = () => {
  return (
    <div>
      <navbar className='bg-[#FFFFFF] flex h-18 items-center p-4'>
        <div className='basic_black font-bold text-2xl pl-16'>TEXTA</div>
        <ul className='flex text-[#636E7D] pl-35 font-semibold gap-12'>
            <li><a href="">Home</a></li>
            <li><a href="">Create</a></li>
            <li><a href="">Profile</a></li>
        </ul>
      </navbar>
    </div>
  )
}

export default Nav
