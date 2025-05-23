import React from 'react'

const Navbar = () => {
  return (
    <nav className='bg-slate-800 text-white'>

    <div className='mycontainer flex justify-between items-center px-4 py-5 h-14'>
        <div className="logo text-white text-2xl font-bold">
            <span className='text-green-500'>&lt;</span>
            <span>Pass/</span><span className='text-green-500'>&gt;</span>
        </div>

        
        <button className='text-white bg-slate-900 my-5 mx-2 rounded-full flex  justify-between items-center ring-white ring-1 cursor-pointer hover:bg-slate-700'> 
                    <img className='invert  w-10 p-1' src="/icon/github.svg" alt="github logo" />
                    <span className='font-bold px-2'>GitHub</span>
                    
                </button>
    </div>
    </nav>
  )
}

export default Navbar
