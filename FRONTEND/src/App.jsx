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
      <p className='text-[#636E7D]'>Thoughts, ideas, and stories from the community.</p>

      <div className='flex flex-col gap-1.5'>
        <PostCard/>
        <PostCard/>
      </div>

      <button onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseExit}>
        <Player 
            ref={playerRef} 
            icon={ postIcon }
        />
      </button>
      
      </div>
    </>
  )
}

export default App
