import React, { useState } from 'react'
import Navbar from './shared/Navbar'
import { Avatar, AvatarImage } from './ui/avatar'
import { Button } from './ui/button'
import { Contact, Mail, Pen } from 'lucide-react'
import { Badge } from './ui/badge'
import AppliedJobTable from './AppliedJobTable'
import UpdateProfileDialog from './UpdateProfileDialog'
import { useSelector } from 'react-redux'

const skills = ["Html", "Css", "Java", "mongodb"]
const isResume = true

const Profile = () => {
    const [open, setOpen] = useState(false)
    const { user } = useSelector((state) => state.auth)
    
    return (
        <div>
            <Navbar />
            <div className='mx-auto max-w-5xl border border-gray-400 p-8 rounded-2xl my-5'>
                <div className='flex items-center justify-between'>
                    <div className='flex items-center gap-4'>
                        <Avatar>
                            <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
                        </Avatar>
                        <div>
                            <h1 className='font-medium text-xl'>{user?.fullName}</h1>
                            <p>{user?.profile?.bio}</p>
                        </div>
                    </div>
                    <Button onClick={() => setOpen(true)} variant="outline"><Pen /></Button>
                </div>
                <div className='flex items-center gap-2 my-2'>
                    <Mail />
                    <span>{user?.email}</span>
                </div>
                <div className='flex items-center gap-2 my-2'>
                    <Contact />
                    <span>{user?.phoneNumber}</span>
                </div>
                <div>
                    <h1>Skills</h1>
                    {
                        user?.profile?.skills?.length
                            ? user.profile.skills.map((item, index) => (
                                <Badge className="mr-2" key={index}>{item}</Badge>
                            ))
                            : <span>NA</span>
                    }

                </div>
                <div>
                    <h1 className='font-medium'>Resume</h1>
                    {
                        isResume ? <a href={user.profile.resume} target='_blank' className='text-blue-500 hover:underline hover:text-blue-800'>Suman</a> : <span>NA</span>
                    }
                </div>
            </div>
            <div className='mx-auto max-w-5xl'>
                <h1 className='font-bold text-lg'>Applied Jobs</h1>
                <AppliedJobTable />
            </div>
            <UpdateProfileDialog open={open} setOpen={setOpen} />
        </div>
    )
}

export default Profile