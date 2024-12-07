import React, { useState } from 'react';
import Navbar from '../shared/Navbar';
import { Label } from '../ui/label';
import { Input } from '../ui/input';
import { RadioGroup, RadioGroupItem } from '../ui/radio-group';
import { Button } from '../ui/button';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'sonner';
import { useDispatch, useSelector } from 'react-redux';
import { setLoader } from '@/redux/authSlice';
import { Loader2 } from 'lucide-react';

const Signup = () => {
    const [input, setInput] = useState({
        fullName: '',
        email: '',
        phoneNumber: '',
        password: '',
        role: '',
        file: ''
    })

    const navigate = useNavigate()
    const dispatch = useDispatch()
    const { loading } = useSelector((state) => state.auth)

    const changeEventHandler = (e) => {
        setInput({ ...input, [e.target.name]: e.target.value })
    }
    const changeFileHandler = (e) => {
        setInput({ ...input, file: e.target.files?.[0] })
    }

    const submitHandler = async (e) => {
        e.preventDefault()
        dispatch(setLoader(true))
        try {
            console.log('kl');
            const formData = new FormData();
            formData.append("fullName", input.fullName);
            formData.append("email", input.email);
            formData.append("phoneNumber", input.phoneNumber);
            formData.append("password", input.password);
            formData.append("role", input.role);
            if (input.file) {
                formData.append("file", input.file);
            }

            const res = await axios.post("http://localhost:3000/api/v1/user/register", formData,
                {
                    headers: {
                        "Content-Type": "multipart/form-data",
                    },
                    withCredentials: true
                }
            )
            console.log(res.status);

            if (res.status.success) {
                toast.success(res.data.message)
                navigate('/login')
            } else {
                toast.error(res.data.message)
            }
        } catch (error) {
            toast.error(error.response?.data?.message)
        } finally{
            dispatch(setLoader(false))
        }

    }
    return (
        <div>
            <Navbar />
            <div className="flex items-center justify-center mx-auto max-w-6xl">
                <form onSubmit={submitHandler} className="w-1/2 border border-gray-200 shadow-xl rounded-lg p-4 my-10">
                    <h1 className="font-bold text-lg mb-5">Signup</h1>

                    <div className="mb-4">
                        <Label>Full Name</Label>
                        <Input
                            type="text"
                            placeholder="Enter Your Full Name"
                            value={input.fullName}
                            name="fullName"
                            onChange={changeEventHandler}
                        />
                    </div>

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
                        <Label>Phone Number</Label>
                        <Input
                            type="number"
                            placeholder="Phone Number"
                            value={input.phoneNumber}
                            name="phoneNumber"
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

                    {/* <div className="mb-4">
                        <Label>Confirm Password</Label>
                        <Input
                            type="password"
                            placeholder="Confirm Password"
                        />
                    </div> */}
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
                        <div className='flex items-center'>
                            <label htmlFor="photo">Profile</label>
                            <Input
                                id='photo'
                                type='file'
                                accept='image/*'
                                onChange={changeFileHandler}
                            />
                        </div>
                    </div>

                    {
                        loading ?
                            (<Button className="w-full my-4"><Loader2 className='animate-spin' />Please wait</Button>)
                            :
                            (<Button className="w-full my-4">Login</Button>)
                    }
                    <span className='text-sm'>Already have an account?<Link to={'/login'} className='text-blue-600 ml-2'>Login</Link></span>
                </form>
            </div>
        </div>
    );
};

export default Signup;
