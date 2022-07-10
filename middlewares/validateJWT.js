const jwt = require('jsonwebtoken')
const User = require('../models/user.model')

const { request, response } = require('express')


const validateJWT = async (req = request, res = response, next) => {

    const token = req.header('x-token')

    if (!token) {
        return res.status(401).json({
            success: false,
            response: 'No hay token en la peticion!'
        })
    }

    try {

        const { uid } = jwt.verify(token, process.env.SECRETORPUBLICKEY)

        const userLogged = await User.findById(uid)

        if (!userLogged) {
            return res.status(404).json({
                success: false,
                response: 'Token invalido! - code: 2'
            })
        }

        if (!userLogged.status) {
            return res.status(401).json({
                success: false,
                response: 'Token invalido! - code: 3'
            })
        }

        req.user = userLogged
        next()

    } catch (error) {

        return res.status(500).json({
            success: false,
            response: error

        })
    }

}


module.exports = validateJWT