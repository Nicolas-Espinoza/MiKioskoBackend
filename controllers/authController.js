const User = require('../models/user.model')
const bcrypt = require('bcryptjs')
const generarJWT = require('../helpers/generarJWT')


const { request, response } = require('express')

const authController = {

    loguearUsuario: async (req = request, res = response) => {

        try {

            const { mail, password } = req.body

            const user = await User.findOne({ mail })

            if (!user) {
                return res.status(400).json({
                    success: false,
                    response: 'Usuario o contraseña incorrectos!'
                })
            }

            if (!user.status) {
                return res.status(400).json({
                    success: false,
                    response: 'Usuario incorrecto - contacte a un administrador!'
                })
            }

            const validatePassword = bcrypt.compareSync(password, user.password)

            if (!validatePassword) {
                return res.status(400).json({
                    success: false,
                    response: 'Usuario o contraseña incorrectos!'
                })
            }

            const token = await generarJWT(user.id)

            return res.status(200).json({
                success: true,
                response: token
            })

        } catch (error) {
            console.log('error', error)
            return res.status(500).json({
                success: false,
                response: error
            })
        }
    },

    loginWithGoogle: (req = request, res = response) => {

        return res.status(200).json({
            success: true,
            response: 'Hola campito!'
        })
    }
}


module.exports = authController