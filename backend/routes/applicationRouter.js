const express = require('express')
const router = express.Router()

const isAuthenticated = require('../middlewares/isAuthenticated')
const { applyJob, getApplicants, getAppliedjobs, updateStatus } = require('../controllers/applicationController')

router.route('/apply/:id').get(isAuthenticated,applyJob)
router.route('/get').get(isAuthenticated,getAppliedjobs)
router.route('/:id/applicants').get(isAuthenticated,getApplicants)
router.route('/status/:id/update').post(isAuthenticated,updateStatus)


module.exports = router