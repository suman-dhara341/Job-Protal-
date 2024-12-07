import React from 'react'
import { Button } from './ui/button'
import { Bookmark } from 'lucide-react'
import { Avatar, AvatarImage } from './ui/avatar'
import { Badge } from './ui/badge'
import { Link, useNavigate } from 'react-router-dom'

const Job = () => {
const navigate=useNavigate()
  const jobs="kdvsdks"
  return (
    <div className='p-5 rounded-md shadow-lg hover:shadow-2xl bg-white border border-gray-200'>
      <div className='flex items-center gap-2 justify-between'>
        <p className='text-sm text-gray-500'>2 days ago</p>
        <Button variant='outline' className="rounded-full" size="icon"><Bookmark /></Button>
      </div>
      <div className='flex items-center mt-2 gap-4'>
        <Button variant="outline">
          <Avatar>
            <AvatarImage src="https://www.shutterstock.com/image-vector/circle-line-simple-design-logo-600nw-2174926871.jpg" alt="@shadcn" />
          </Avatar>
        </Button>
        <div>
          <h1 className='font-medium text-lg'>Company Name</h1>
          <p className='text-sm text-gray-700'>India</p>
        </div>

      </div>
      <div>
        <h1 className='font-bold text-lg my-2'>Title</h1>
        <p className='text-sm text-gray-600'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Consequatur aliquam facere eligendi minima.</p>
      </div>
      <div className='flex items-center gap-2 mt-3'>
        <Badge className="text-blue-700 font-bold" variant="ghost">12 Positions</Badge>
        <Badge className="text-[#f83002] font-bold" variant="ghost">Part Time</Badge>
        <Badge className="text-[#7209b7] font-bold" variant="ghost">24Lpa</Badge>
      </div>
      <div className='flex items-center justify-between mt-5'>
        <Button onClick={()=>navigate(`/jobs/description/${jobs}`)} variant="outline">Details</Button>
        <Button className="bg-[#6a38c2]">Save For Later</Button>
      </div>
    </div>
  )
}

export default Job