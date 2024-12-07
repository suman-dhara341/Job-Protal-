import React from 'react'
import { Popover, PopoverContent, PopoverTrigger } from '../ui/popover'
import {
  Avatar,
  AvatarImage,
} from '../ui/avatar'
import { Button } from "@/components/ui/button"
import { LogOut, User2 } from 'lucide-react'
import { Link, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { toast } from 'sonner'
import axios from 'axios'
import { setUser } from '@/redux/authSlice'


const Navbar = () => {
  const { user } = useSelector((state) => state.auth)
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const logoutHandler = async () => {
    try {
      const res = await axios.post("http://localhost:3000/api/v1/user/logout", { withCredentials: true })
      if (res.data.success) {
        toast.success(res.data.message)
        dispatch(setUser(null))
        navigate('/login')
      }
    } catch (error) {
      console.log(error);
      toast.error(error.response.data.message)

    }
  }


  return (
    <div className='bg-white'>
      <div className='flex items-center justify-between mx-auto max-w-6xl h-16'>
        <div>
          <h1 className='text-2xl font-bold'>Job<span className='text-[#f83002]'>Portal</span></h1>
        </div>
        <div className='flex items-center gap-12 justify-center'>
          <ul className='flex font-medium items-center gap-5'>
            <li><Link to='/'>Home</Link></li>
            <li><Link to='/jobs'>Jobs</Link></li>
            <li><Link to='/browse'>Browse</Link></li>
          </ul>
          {
            !user ?
              <div className='flex items-center gap-3'>
                <Link to={'/login'}>
                  <Button variant="outline" >Login</Button>
                </Link>
                <Link to={'/signup'}>
                  <Button className="bg-[#6a38c2] hover:bg-[#492785]">Signup</Button>
                </Link>
              </div> :
              <Popover>
                <PopoverTrigger asChild>
                  <Avatar className='cursor-pointer' >
                    <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
                  </Avatar>
                </PopoverTrigger>
                <PopoverContent>
                  <div className='flex gap-4 items-center'>
                    <Avatar className='cursor-pointer' >
                      <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
                    </Avatar>
                    <div>
                      <h1 className='font-medium'>{user.fullName}</h1>
                      <p className='text-sm text-muted-foreground'>Lorem ipsum dolor sit amet.</p>
                    </div>
                  </div>
                  <div className='flex flex-col text-gray-600 mt-4'>
                    <div className='flex items-center'>
                      <User2 />
                      <Button variant="link"><Link to='/profile'>View profile</Link></Button>
                    </div>
                    <div className='flex items-center'>
                      <LogOut />
                      <Button onClick={logoutHandler} variant="link">Logout</Button>
                    </div>
                  </div>
                </PopoverContent>
              </Popover>
          }

        </div>
      </div>
    </div>
  )
}

export default Navbar
