import { Dialog, DialogTitle } from '@radix-ui/react-dialog'
import React, { useState } from 'react'
import { Button } from './ui/button'
import { DialogContent, DialogFooter, DialogHeader } from './ui/dialog'
import { Label } from './ui/label'
import { Input } from './ui/input'
import { Loader2 } from 'lucide-react'
import { useDispatch, useSelector } from 'react-redux'
import axios from 'axios'
import { toast } from 'sonner'
import { setUser } from '@/redux/authSlice'

const UpdateProfileDialog = ({ open, setOpen }) => {
    const [loading, setLoading] = useState(false)
    const { user } = useSelector((state) => state.auth)
    const dispatch = useDispatch()

    const [input, setInput] = useState({
        fullName: user?.fullName || "",
        email: user?.email || "",
        phoneNumber: user?.phoneNumber || "",
        bio: user?.profile?.bio || "",
        skills: user?.profile?.skills.map((item) => item) || "",
        file: user?.profile?.resume || ""
    })

    const changeEventHandaler = (e) => {
        setInput({ ...input, [e.target.name]: e.target.value })
    }

    const fileChangeHandaler = (e) => {
        const file = e.target.files?.[0];
        setInput({ ...input, file })
    };




    const submitHandler = async (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append("fullName", input.fullName);
        formData.append("email", input.email);
        formData.append("phoneNumber", input.phoneNumber);
        formData.append("bio", input.bio);
        formData.append("skills", input.skills);
        if (input.file) {
            formData.append("file", input.file);
        }
        try {
            setLoading(true);
            const res = await axios.post("http://localhost:3000/api/v1/user/profile/update", formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                },
                withCredentials: true
            });
            if (res.data.success) {
                dispatch(setUser(res.data.user));
                toast.success(res.data.message);
            }
        } catch (error) {
            console.log(error);
            toast.error(error.response.data.message);
        } finally {
            setLoading(false);
        }
        setOpen(false);
        console.log(input);
    }


    return (
        <Dialog open={open}>
            <DialogContent className="sm:max-w-[500px]" onInteractOutside={() => setOpen(false)}>
                <DialogHeader>
                    <DialogTitle>Update Profile</DialogTitle>
                </DialogHeader>
                <form onSubmit={submitHandler} >
                    <div className='grid gap-4 py-4'>
                        <div className='grid grid-cols-4 items-center gap-4'>
                            <Label htmlFor="name" className="text-right">Name</Label>
                            <Input
                                id="name"
                                name="fullName"
                                className="col-span-3"
                                value={input.fullName}
                                onChange={changeEventHandaler}
                            />
                        </div>
                        <div className='grid grid-cols-4 items-center gap-4'>
                            <Label htmlFor="email" className="text-right">Email</Label>
                            <Input
                                id="email"
                                name="email"
                                className="col-span-3"
                                value={input.email}
                                onChange={changeEventHandaler}

                            />
                        </div>
                        <div className='grid grid-cols-4 items-center gap-4'>
                            <Label htmlFor="number" className="text-right">Number</Label>
                            <Input
                                id="number"
                                name="phoneNumber"
                                className="col-span-3"
                                value={input.phoneNumber}
                                onChange={changeEventHandaler}

                            />
                        </div>
                        <div className='grid grid-cols-4 items-center gap-4'>
                            <Label htmlFor="bio" className="text-right">Bio</Label>
                            <Input
                                id="bio"
                                name="bio"
                                className="col-span-3"
                                value={input.bio}
                                onChange={changeEventHandaler}

                            />
                        </div>
                        <div className='grid grid-cols-4 items-center gap-4'>
                            <Label htmlFor="skills" className="text-right">Skills</Label>
                            <Input
                                id="skills"
                                name="skills"
                                className="col-span-3"
                                value={input.skills}
                                onChange={changeEventHandaler}

                            />
                        </div>
                        <div className='grid grid-cols-4 items-center gap-4'>
                            <Label htmlFor="file" className="text-right">Resume</Label>
                            <Input
                                id="file"
                                name="file"
                                type="file"
                                accept="application/pdf"
                                className="col-span-3"
                                onChange={fileChangeHandaler}
                            />
                        </div>
                    </div>
                    <DialogFooter>
                        {
                            loading ?
                                (<Button className="w-full my-4"><Loader2 className='animate-spin' />Please wait</Button>)
                                :
                                (<Button className="w-full my-4">Update</Button>)
                        }
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    )
}

export default UpdateProfileDialog