const User = require('../models/userModel')
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const getDataUri = require('../utils/dataUri');
const cloudinary = require('../utils/cloudinary')



const register = async (req, res) => {
    try {
        const { fullName, email, phoneNumber, password, role } = req.body
        console.log(fullName, email, phoneNumber, password, role);

        if (!fullName || !email || !phoneNumber || !password || !role) {
            return res.status(400).json({
                message: "Somthig is missing",
                success: false
            })
        }

        const user = await User.findOne({ email })

        if (user) {
            return res.status(400).json({
                message: "User already register with this email",
                success: false
            })
        }

        const hashedPssword = await bcrypt.hash(password, 10)

        await User.create({
            fullName,
            email,
            phoneNumber,
            password: hashedPssword,
            role
        })

        return res.status(200).json({
            message: "Account created successfully",
            success: true
        })
    } catch (error) {
        console.log(error);

    }
}



// login

const login = async (req, res) => {
    try {
        const { email, password, role } = req.body;
        console.log(email, password, role);

        if (!email || !password || !role) {
            return res.status(400).json({
                message: "Somthing is missing",
                success: false
            })
        }

        const user = await User.findOne({ email })

        if (!user) {
            return res.status(400).json({
                message: "User not found",
                success: false
            })
        }

        const isPasswordMatche = await bcrypt.compare(password, user.password)

        if (!isPasswordMatche) {
            return res.status(400).json({
                message: "User not found",
                success: false
            })
        }


        if (role !== user.role) {
            return res.status(400).json({
                message: "Account doesn't exist with the current role.",
                success: false,
            });
        }


        const userData = {
            _id: user._id,
            fullName: user.fullName,
            email: user.email,
            phoneNumber: user.phoneNumber,
            role: user.role,
            profile: user.profile
        }

        const tokenData = {
            userId: user._id
        }

        const token = await jwt.sign(
            { tokenData },
            process.env.JWT_SECRET,
            {
                expiresIn: '1d'
            }
        )

        return res.status(200).cookie("token", token, {
            maxAge: 24 * 60 * 60 * 1000,
            httpOnly: true,
            sameSite: 'strict',
            secure: true
        }).json({
            message: `Welcome back ${user.fullName}`,
            userData,
            success: true
        })
    } catch (error) {
        console.log(error);

    }
}


// logout

const logout = async (req, res) => {
    try {
        return res.status(200).cookie("token", "", { maxAge: 0 }).json({
            message: "Logout Successfully",
            success: true
        })
    } catch (error) {
        console.log(error);
    }
}


// update Profile

const updateProfile = async (req, res) => {
    try {
        const { fullName, email, phoneNumber, bio, skills } = req.body;


        const userId = req.Id;
        const file = req.file;
        // console.log(file);
        if (!file) {
            return res.status(400).json({
                message: "No file uploaded.",
                success: false
            });
        }

        const fileUri = getDataUri(file);
        const cloudResponse = await cloudinary.uploader.upload(fileUri.content, {
            resource_type: 'raw'  // Important for non-image files like PDFs
        });

        console.log(cloudResponse);
        




        let skillsArray;
        if (skills) {
            skillsArray = skills.split(",");
        }
        let user = await User.findById(userId);

        if (!user) {
            return res.status(400).json({
                message: "User not found.",
                success: false
            })
        }
        // updating data
        if (fullName) user.fullName = fullName
        if (email) user.email = email
        if (phoneNumber) user.phoneNumber = phoneNumber
        if (bio) user.profile.bio = bio
        if (skills) user.profile.skills = skillsArray

        // resume comes later here...
        if (cloudResponse) {
            user.profile.resume = cloudResponse.secure_url // save the cloudinary url
            user.profile.resumeOriginalName = file.originalname // Save the original file name
        }


        await user.save();

        user = {
            _id: user._id,
            fullName: user.fullName,
            email: user.email,
            phoneNumber: user.phoneNumber,
            role: user.role,
            profile: user.profile
        }

        return res.status(200).json({
            message: "Profile updated successfully.",
            user,
            success: true
        })
    } catch (error) {
        console.log(error);
    }
}




module.exports = { register, login, logout, updateProfile }