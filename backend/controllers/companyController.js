const Company = require("../models/companyModel");

const registerCompany = async (req, res) => {
    try {
        const { companyName } = req.body

        if (!companyName) {
            return res.status(400).json({
                message: "Company name is required",
                success: false
            })
        }

        let company = await Company.findOne({ name:companyName })
        
        
        if (company) {
            return res.status(400).json({
                message: "You cann't registered same company",
                success: false
            })
        }

        company = await Company.create({
            name: companyName,
            userId: req.Id
        })

        return res.status(200).json({
            message: "Company registered succesfully",
            company,
            success: true
        })

    } catch (error) {
        console.log(error);
    }
}



const getCompony = async (req, res) => {
    try {
        const userId = req.Id

        let company = await Company.find({ userId })
        if (!company) {
            return res.status(400).json({
                message: "Company not found",
                success: false
            })
        }

        return res.status(200).json({
            message: "Company get successfully",
            company
        })
    } catch (error) {
        console.log(error);
    }
}


const getCompanybyId = async (req, res) => {
    try {
        const companyId = req.params.id
        const company = await Company.findById(companyId)

        if (!company) {
            return res.status(400).json({
                message: "Company not found",
                success: false
            })
        }

        return res.status(200).json({
            company,
            success: true
        })
    } catch (error) {
        console.log(error);
    }
}


const updateCompany = async (req, res) => {
    try {
        const { name, description, website, location } = req.body
        const file = req.file
        const updateData = { name, description, website, location }
        const company = await Company.findByIdAndUpdate(req.params.id, updateData)
        console.log(company);

        if (!company) {
            return res.status(400).json({
                message: "Company updated problem",
                success: false
            })
        }

        return res.status(200).json({
            message: "Updated successfully",
            success: true
        })
    } catch (error) {
        console.log(error);
    }
}

module.exports = { registerCompany, getCompony, getCompanybyId, updateCompany }