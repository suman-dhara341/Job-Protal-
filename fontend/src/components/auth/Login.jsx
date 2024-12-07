import React, { useState } from 'react';
import Navbar from '../shared/Navbar';
import { Label } from '../ui/label';
import { Input } from '../ui/input';
import { RadioGroup } from '../ui/radio-group';
import { Button } from '../ui/button';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'sonner';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { setLoader, setUser } from '@/redux/authSlice';
import { Loader2 } from 'lucide-react';

const Login = () => {
  const [input, setInput] = useState({
    email: '',
    password: '',
    role: ''
  })

  const dispatch = useDispatch()
  const { loading } = useSelector((state) => state.auth)
  const navigate = useNavigate()

  const changeEventHandler = (e) => {
    setInput({ ...input, [e.target.name]: e.target.value })
  }


  const submitHandler = async (e) => {
    dispatch(setLoader(true));
    e.preventDefault();

    try {
      console.log('sd');

      const res = await axios.post("http://localhost:3000/api/v1/user/login", input,
        { withCredentials: true }
      );

      console.log('Response:', res);

      // Check success
      if (res.data.success) {
        console.log('Login successful:', res.data.userData);
        dispatch(setUser(res.data.userData));
        toast.success(res.data.message);

        // Redirect after successful login
        navigate('/'); // Update with the desired path
      } else {
        console.log('Login failed');
      }
    } catch (error) {
      console.error('Login error:', error);
      toast.error(error.response?.data?.message || 'An error occurred');
    } finally {
      dispatch(setLoader(false));
    }
  };




  return (
    <div>
      <Navbar />
      <div className="flex items-center justify-center mx-auto max-w-6xl">
        <form onSubmit={submitHandler} className="w-1/2 border border-gray-200 rounded-lg p-4 my-10">
          <h1 className="font-bold text-lg mb-5">Login</h1>

          <div className="mb-4">
            <Label>Email ID</Label>
            <Input
              type="email"
              placeholder="Email ID"
              value={input.email}
              name="email"
              onChange={changeEventHandler}
            />
          </div>

          <div className="mb-4">
            <Label>Password</Label>
            <Input
              type="password"
              placeholder="Password"
              value={input.password}
              name="password"
              onChange={changeEventHandler}
            />
          </div>

          <div className='flex items-center justify-between'>
            <RadioGroup className="flex my-2">
              <div className="flex items-center space-x-2">
                <Input
                  type='radio'
                  name='role'
                  value='student'
                  id='r1'
                  checked={input.role === 'student'}
                  onChange={changeEventHandler}
                />
                <Label htmlFor="r1">Student</Label>
              </div>
              <div className="flex items-center space-x-2">
                <Input
                  type='radio'
                  name='role'
                  value='recruiter'
                  id='r2'
                  checked={input.role === 'recruiter'}
                  onChange={changeEventHandler}

                />
                <Label htmlFor="r2">Recruiter</Label>
              </div>

            </RadioGroup>
          </div>
          {
            loading ?
              (<Button className="w-full my-4"><Loader2 className='animate-spin' />Please wait</Button>)
              :
              (<Button className="w-full my-4">Login</Button>)
          }

          <span className='text-sm'>Don't have an account?<Link to={'/signup'} className='text-blue-600 ml-2'>Signup</Link></span>
        </form>
      </div>
    </div>
  );
};

export default Login;
