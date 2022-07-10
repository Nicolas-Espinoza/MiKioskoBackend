const express = require("express");
const { check } = require('express-validator')
const errorHandler = require('../middlewares/errorsHandler')

const { crearUsuario, modificarUsuario, desactivarUsuario, eliminarUsuario, obtenerUsuarios, obtenerUsuario } = require("../controllers/userController");
const { userExist, mailExist } = require("../helpers/db-validators");

const router = express.Router()

router.post('/', [
    check('name', 'El nombre de usuario es requerido!').notEmpty(),
    check('password', 'The password is required!').notEmpty(),
    check('password', 'Minimo 6 caracteres').isLength({ min: 6 }),
    check('mail', 'el mail es requerido!').notEmpty(),
    check('mail', 'No es un mail de formato valido!').isEmail(),
    check('mail').custom(mailExist),
    errorHandler
], crearUsuario)


router.patch('/:id', [
    check('id', 'No es un ID de mongo valido!').isMongoId(),
    check('id').custom(userExist),
    errorHandler
], modificarUsuario)


router.put('/:id', [
    check('id', 'No es un ID de mongo valido!').isMongoId(),
    check('id').custom(userExist),
    errorHandler
], desactivarUsuario)


router.delete('/:id', [
    check('id', 'No es un ID de mongo valido!').isMongoId(),
    check('id').custom(userExist),
    errorHandler
], eliminarUsuario)


router.get('/', obtenerUsuarios)


router.get('/:id', [
    check('id', 'No es un ID de mongo valido!'),
    check('id').custom(userExist),
    errorHandler
], obtenerUsuario)

module.exports = router;