const express = require('express')
const router = express.Router()

const isAuthenticated = require('../middlewares/isAuthenticated')
const { registerCompany, getCompony, getCompanybyId, updateCompany } = require('../controllers/companyController')

router.route('/register').post(isAuthenticated, registerCompany)
router.route('/get').get(isAuthenticated, getCompony)
router.route('/get/:id').get(isAuthenticated, getCompanybyId)
router.route('/update/:id').put(isAuthenticated, updateCompany)



module.exports = router