import React from 'react'
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from './ui/table'
import { Button } from './ui/button'

const AppliedJobTable = () => {
  return (
      <Table className="my-5">
          <TableCaption>A list of your applied jobs</TableCaption>
          <TableHeader>
              <TableRow>
                <TableHead>Date</TableHead>
                <TableHead>Job Role</TableHead>
                <TableHead>Company</TableHead> 
                <TableHead>Status</TableHead> 
              </TableRow>
          </TableHeader>
          <TableBody>
            {
                [1,2,3,4,5].map((item,index)=>(
                    <TableRow key={index}>
                        <TableCell>12.12.2222</TableCell>
                        <TableCell>MERN</TableCell>
                        <TableCell>ABC limited</TableCell>
                        <Button>Pending</Button>
                    </TableRow>
                ))
            }
          </TableBody>
      </Table>
  )
}

export default AppliedJobTable