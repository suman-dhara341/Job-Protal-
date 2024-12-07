import React from 'react'
import { Button } from './ui/button'
import { Search } from 'lucide-react'

const Herosection = () => {
  return (
    <div className='text-center flex flex-col gap-4'>
      <span className='mx-auto text-[#f83002] bg-gray-100 px-4 py-2 rounded-full font-medium'>No. 1 Job Hunt Website</span>
      <h1 className='text-5xl font-bold'>Search,Apply &<br />Get you  <span className='text-[#6a38c2]'>Dream jobs</span></h1>
      <div className='border border-gray-200 shadow-lg mx-auto pl-3 w-[40%] rounded-full flex items-center'>
        <input type="text"
          placeholder='Search your dream jobs'
          className='outline-none w-full'
        />
        <Button className="rounded-r-full bg-[#6a38c2] hover:bg-[#37196b] ">
          <Search className='h-5 w-5'>Search</Search>
        </Button>
      </div>
    </div>
  )
}

export default Herosection