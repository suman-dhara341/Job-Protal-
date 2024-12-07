import React from 'react'
import { Badge } from './ui/badge'
import { Button } from './ui/button'
import Navbar from './shared/Navbar'

const JobDescription = () => {
    const isApplied = true
    return (
        <>
            <Navbar />
            <div className='mx-auto max-w-6xl mt-9'>
                <div className='flex items-center justify-between'>
                    <div>
                        <h1 className='font-bold text-2xl'>Frontent Devoloper</h1>
                        <div className='flex items-center gap-2 mt-3'>
                            <Badge className="text-blue-700 font-bold" variant="ghost">12 Positions</Badge>
                            <Badge className="text-[#f83002] font-bold" variant="ghost">Part Time</Badge>
                            <Badge className="text-[#7209b7] font-bold" variant="ghost">24Lpa</Badge>
                        </div>
                    </div>
                    {
                        isApplied ?
                            <Button variant="outline" disabled>Already Applied</Button>
                            :
                            <Button className="bg-blue-500 hover:bg-blue-700">Apply Now</Button>
                    }
                </div>
                <h1 className='font-bold text-lg border-b-2 border-b-gray-300 my-4 pb-2'>Job Description</h1>
                <div className='py-4'>
                    <h1 className='font-bold my-1'>Role: <span className='pl-4 font-normal text-gray-800'>Frontend Devoloper</span></h1>
                    <h1 className='font-bold my-1'>Location: <span className='pl-4 font-normal text-gray-800'>Tamluk</span></h1>
                    <h1 className='font-bold my-1'>Description: <span className='pl-4 font-normal text-gray-800'>Lorem ipsum dolor sit amet consectetur adipisicing elit.</span></h1>
                    <h1 className='font-bold my-1'>Experience: <span className='pl-4 font-normal text-gray-800'>2 years</span></h1>
                    <h1 className='font-bold my-1'>Total Applicants: <span className='pl-4 font-normal text-gray-800'>4</span></h1>
                    <h1 className='font-bold my-1'>Post date: <span className='pl-4 font-normal text-gray-800'>17-07-1999</span></h1>
                    <h1 className='font-bold my-1'>Role: <span className='pl-4 font-normal text-gray-800'>Frontend Devoloper</span></h1>
                </div>
            </div>
        </>
    )
}

export default JobDescription