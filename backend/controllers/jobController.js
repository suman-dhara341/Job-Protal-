const Job = require('../models/jobModel')


// admin post the job
const postJob = async (req, res) => {
    try {
        const { title, description, requirements, salary, experience, location, jobType, position, companyId } = req.body

        const userId = req.Id

        if (!title || !description || !requirements || !salary || !experience || !location || !jobType || !position || !companyId) {
            return res.status(400).json({
                message: "Somethind is missing",
                success: false
            })
        }

        const job = await Job.create({
            title,
            description,
            requirements: requirements.split(","),
            salary,
            experience,
            location,
            jobType,
            position,
            company: companyId, //I have doubt in this section
            created_by: userId

        })

        return res.status(200).json({
            message: "New job created succesfully",
            job,
            success: true
        })
    } catch (error) {
        console.log(error);
    }
}



// most importent part
// student get the job
const getAllJobs = async (req, res) => {
    try {
        const keyword = req.query.keyword || ""

        const query = {
            $or: [
                { title: { $regex: keyword, $options: "i" } },
                { description: { $regex: keyword, $options: "i" } }
            ]
        }

        const jobs = await Job.find(query).populate({
            path:"company"
        }).sort({cretedAt:-1}) 

        if (!jobs) {
            return res.status(404).json({
                message: "Job not found",
                success: false
            })
        }

        return res.status(200).json({
            jobs,
            success: true
        })
    } catch (error) {
        console.log(error);

    }
}


// student open the job
const getJobById = async (req, res) => {
    try {
        const jobId = req.params.id
        const job = await Job.findById(jobId)

        if (!job) {
            return res.status(400).json({
                message: "Job not found",
                success: false
            })
        }

        return res.status(200).json({
            job,
            success: true
        })
    } catch (error) {
        console.log(error);
    }
}

// admin 
const getAdmionJobs = async (req, res) => {
    try {
        const adminId = req.Id;
        const jobs = await Job.find({ created_by: adminId })

        if (!jobs) {
            return res.status(400).json({
                message: "Jobs not found",
                message: false
            })
        }

        return res.status(200).json({
            jobs,
            success: true
        })
    } catch (error) {
        console.log(error);
    }
}
module.exports = { postJob, getAllJobs, getJobById, getAdmionJobs }