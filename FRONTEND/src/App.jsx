import { useState,useEffect, useRef } from 'react'
import './App.css'
import Nav from './components/Nav'
import PostCard from './components/PostCard'
import { Player } from '@lordicon/react';
import postIcon from './assets/postIcon.json'


function App() {
  const [count, setCount] = useState(0)
  const playerRef = useRef(null)

  const handleMouseEnter = () => {
        playerRef.current?.playFromBeginning();
    }

    const handleMouseExit = () => {
        playerRef.current?.stop();
    }

  return (
    <>
      <Nav/>
      
      <div className='px-44'>
          <p className='font-bold basic_black text-4xl mt-10'>Your feed</p>
        <div className='flex justify-between items-center'>
          <p className='text-[#636E7D]'>Thoughts, ideas, and stories from the community.</p>
          <button className='cursor-pointer mr-1.5' onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseExit}>
            <Player 
              ref={playerRef} 
              icon={ postIcon }
              size={45}
            />
          </button>
        </div>

        <div className='flex flex-col gap-1.5'>
          <PostCard/>
          <PostCard/>
        </div>
      
      </div>
    </>
  )
}

export default App
