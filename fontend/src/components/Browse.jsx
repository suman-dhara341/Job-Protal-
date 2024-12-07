import React from 'react'
import Navbar from './shared/Navbar'
import Job from './Job'

const random = [1, 3, 4, 5, 7, 6]
const Browse = () => {
    return (
        <div>
            <Navbar />
            <div className='mx-auto max-w-6xl my-8'>
                <h1 className='my-4 font-bold'>Search Result ({random.length})</h1>
                <div className='grid grid-cols-3 gap-4'>
                    {
                        random.map((item, index) => (
                            <div>
                                <Job />
                            </div>
                        ))
                    }

                </div>
            </div>


        </div>
    )
}

export default Browse
