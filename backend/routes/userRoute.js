const express = require('express')
const router = express.Router()

const { register, login, logout, updateProfile } = require('../controllers/userController')
const isAuthenticated = require('../middlewares/isAuthenticated')
const singleUpload = require('../middlewares/multer')

router.route('/register').post(singleUpload, register)
router.route('/login').post(login)
router.route('/logout').post(logout)
router.route('/profile/update').post(isAuthenticated, singleUpload, updateProfile)



module.exports = router