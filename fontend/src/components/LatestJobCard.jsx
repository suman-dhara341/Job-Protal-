import React from 'react'
import { Badge } from './ui/badge'

const LatestJobCard = () => {
  return (
    <div className='shadow-lg hover:shadow-2xl p-5 rounded-xl border border-gray-200 mt-6'>
      <div>
        <h1 className='font-medium text-lg'>Company Name</h1>
        <p className='text-sm text-gray-600'>India</p>
      </div>
      <div>
        <p className='font-bold text-lg my-2'>Job Title</p>
        <p className='text-sm text-gray-700'>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Sit Lorem, ipsum dolor..</p>
      </div>
      <div className='flex items-center gap-4'>
        <Badge className="text-blue-700 font-bold" variant="ghost">12 Positions</Badge>
        <Badge className="text-[#f83002] font-bold" variant="ghost">Part Time</Badge>
        <Badge className="text-[#7209b7] font-bold" variant="ghost">24Lpa</Badge>
      </div>
    </div>
  )
}

export default LatestJobCard