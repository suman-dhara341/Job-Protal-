import React from 'react'
import Navbar from './shared/Navbar'
import FilterCard from './FilterCard'
import Job from './Job'

const job = [1, 2, 3, 4, 5, 6, 7, 8, 9]

const Jobs = () => {
  return (
    <div>
      <Navbar />
      <div className='mx-auto max-w-6xl mt-4'>
        <div className='flex gap-5'>
          <div className='w-[20%]'>
            <FilterCard />
          </div>


          {
            job.length <= 0 ? (<span>Jobs not found</span>) :
              <div className='flex-1 h-[80vh] overflow-y-auto pb-5'>
                <div className='grid grid-cols-3 gap-4'>
                  {job.map((item, index) => (
                    <Job />
                  ))}
                </div>

              </div>

          }

        </div>
      </div>
    </div>
  )
}

export default Jobs