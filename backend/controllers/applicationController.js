const Application = require('../models/applicationModel');
const Job = require('../models/jobModel');


const applyJob = async (req, res) => {
    try {
        const userId = req.Id;
        const jobId = req.params.id

        if (!jobId) {
            return res.status(400).json({
                message: "Job id is required",
                success: false
            })
        }

        const existingApplication = await Application.findOne({ job: jobId, applicant: userId })
        if (existingApplication) {
            return res.status(400).json({
                message: "You already applied for this jobs",
                success: false
            })
        }

        const job = await Job.findById(jobId)
        if (!job) {
            return res.status(400).json({
                message: "Job not found",
                success: false
            })
        }

        const newApplication = await Application.create({
            job: jobId,
            applicant: userId
        })

        job.applications.push(newApplication._id)
        await job.save()

        return res.status(200).json({
            message: "Job applied succesfully",
            success: true
        })
    } catch (error) {
        console.log(error);
    }
}



const getAppliedjobs = async (req, res) => {
    try {
        const userId = req.Id;
        const application = await Application.findOne({ applicant: userId }).populate({
            path: 'job',
            populate: {
                'path': "company"
            }
        })

        if (!application) {
            return res.status(404).json({
                message: "No applicant",
                success: false
            })
        }

        return res.status(200).json({
            application,
            success: true
        })
    } catch (error) {
        console.log(error);
    }
}


// admin get all job
const getApplicants = async (req, res) => {
    try {
        const jobId = req.params.id;

        const job = await Job.findById(jobId).populate({
            path: 'applications',
            populate: {
                path: "applicant"
            }
        })

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


const updateStatus = async (req, res) => {
    try {
        const { status } = req.body;
        const applicationId = req.params.id

        if (!status) {
            return res.status(400).json({
                message: "Status is required",
                success: false
            })
        }

        const application = await Application.findOne({ _id: applicationId })
        if (!application) {
            res.status(400).json({
                message: "Application not found",
                success: false
            })
        }

        application.status = status

        await application.save();
        res.status(200).json({
            message: "Status update successfully",
            success: true
        })
    } catch (error) {
        console.log(error);
    }
}
module.exports = { applyJob, getAppliedjobs, getApplicants, updateStatus }