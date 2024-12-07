import React from 'react'
import LatestJobCard from './LatestJobCard'

const LatestJobs = () => {
    const random = [1, 2, 3, 4, 5, 6, 7, 8, 9]

    return (
        <div className='max-w-6xl mx-auto my-20'>
            <h1 className='font-bold text-3xl'><span className='text-[#6a38c2]'>Latest & Top</span> Job Opening</h1>
            <div className='grid grid-cols-3 gap-4'>
                {
                    random.slice(0,6).map((item, index) => (
                        <div key={index}>
                            <LatestJobCard />
                        </div>
                    ))
                }
            </div>

        </div>
    )
}

export default LatestJobs