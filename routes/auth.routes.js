const express = require('express')
const { check } = require('express-validator')

const errorHandler = require('../middlewares/errorsHandler')

const { loginWithGoogle, loguearUsuario } = require('../controllers/authController')



const router = express.Router()


router.post('/', [
    check('mail', 'El mail es obligatorio!').notEmpty(),
    check('password', 'El password es obligatorio!').notEmpty()
], loguearUsuario)


router.post('/google', [], loginWithGoogle)


module.exports = router