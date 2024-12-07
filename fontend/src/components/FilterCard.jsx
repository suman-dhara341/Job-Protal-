import React from 'react'
import { RadioGroup, RadioGroupItem } from './ui/radio-group'
import { Label } from './ui/label'

const filter =
  [
    {
      filterType: "Location",
      array: ["Kolkata", "Howrha", "Tamluk", "Medinipur",]
    },
    {
      filterType: "Industry",
      array: ["Fontend Devolaper", "Backend Devolaper", "MERN", "BBA"]
    },
    {
      filterType: "Salary",
      array: ["0-40K", "40K-60K", "60K-1L", "1L-2L",]
    },
  ]

const FilterCard = () => {
  return (
    <div className='w-full bg-white rounded-md'>
      <h1>Filter Jobs</h1>
      <hr className='mt-2' />
      <RadioGroup>
        {
          filter.map((item, index) => (
            <div>
              <h1 className='font-bold text-lg'>{item.filterType}</h1>
              {
                item.array.map((item, index) => (
                  <div className='flex gap-3 items-center my-3 '>
                    <RadioGroupItem value={item} />
                    <Label >{item}</Label>
                  </div>
                ))
              }
            </div>
          ))
        }
      </RadioGroup>
    </div>
  )
}

export default FilterCard