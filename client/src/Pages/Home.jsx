import React from 'react'
import Hero from '../components/Hero'
export default function Home() {
  return (
    <div className='h-100'>
      <div className='flex justify-between my-10 '>
        <div id='miniText' className='px-12 py-5 '>
          <div className='px-12 py-3  rounded-full' style={{ background: 'rgba(255, 255, 255, 0.20)', backdropFilter: 'blur(3px)' }}>
            <h3 className='opacity-100'>A Place to learn, build and grow in web3</h3>
          </div>
        </div>
        <div className='absolute left-[55%] top-60 z-0 hidden lg:block '>
          <Hero />
        </div>
      </div>
      <div className="relative font-semibold  ">
        <div className="absolute  blur-md text-8xl flex ml-10 uppercase opacity-75 tracking-wider font-mono">
          learn web3<br /> like never <br />before 
        </div>
        <div className='text-8xl flex ml-10 uppercase relative  tracking-wider font-mono'>
          learn web3<br /> like never <br />before
        </div>
      </div>
      <div className='flex justify-between'>
        <div className='flex gap-5 my-10 ml-10' >
          <div id="boxone" >
            <div className='px-3 py-5  rounded-lg' style={{ background: 'rgba(255, 255, 255, 0.20)', backdropFilter: 'blur(3px)' }}>
                <h1 className='opacity-100 pb-5'>AI DRIVEN LEARNING</h1>
                <p>The newest and most sophisticated <br />platform from AI to educate people</p>
            </div>  
          </div>
          <div id="boxtwo" >
            <div className='px-3 py-5  rounded-lg' style={{ background: 'rgba(255, 255, 255, 0.20)', backdropFilter: 'blur(3px)' }}>
                <h1 className='opacity-100 pb-5'>PEER TO PEER LEARNING</h1>
                <p>Improve your project with <br />the help of valuable peer reviews</p>
            </div>  
          </div>
        </div>
        <div className="px-80 mt-28 ">
          <div className="grid gap-8 items-start justify-center">
            <div className="relative group">
              <div className="absolute -inset-0.5 bg-gradient-to-r from-white to-zinc-900 rounded-lg blur opacity-75 group-hover:opacity-100 transition duration-1000 group-hover:duration-200 animate-tilt"></div>
              <button className="relative px-7 py-4 bg-black rounded-lg leading-none ">
                 <a href="/Learn"> Start Learning &rarr;</a>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}