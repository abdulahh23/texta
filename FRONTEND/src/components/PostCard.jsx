import React from 'react'
import { useRef } from 'react'

const PostCard = () => {

    const username = useRef("Abdullah")

  return (
    <div className='bg-[#FFFFFF] mt-5 p-4 pl-6 rounded-2xl'>        
        <p className='text-[#636E7D] font-semibold'>{username.current}</p>
        <p className='basic_black font-bold text-2xl mt-1'>Why I started learning React</p>
        <p className='basic_black mt-2'>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Aperiam et, odio, accusamus quod quidem ut perferendis saepe ipsam dolorum sint aspernatur consectetur in, a ullam necessitatibus nihil incidunt aliquid suscipit?</p>

        <div className='bg-[#F0F2FF] h-22 mt-7 rounded-2xl p-2 px-5 mb-4'>
            <p className='text-[#404FDB] font-bold text-xs mt-1'>AI SUMMARY</p>
            <p className='text-[#636E7D] mt-1'>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Quasi voluptatem nemo modi tenetur animi libero laboriosam impedit beatae corrupti</p>
        </div>
    </div>
  )
}

export default PostCard
