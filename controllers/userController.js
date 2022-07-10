const User = require('../models/user.model')

const { request, response } = require('express')
const bcrypt = require('bcryptjs')


const userController = {

    crearUsuario: async (req = request, res = response) => {

        try {

            const { name, mail, password } = req.body

            const user = new User({
                name, mail, password
            })

            user.password = bcrypt.hashSync(password, 10)
            await user.save()

            return res.status(201).json({
                success: true,
                response: user
            })

        } catch (e) {
            return res.status(500).json({
                success: false,
                response: e
            })
        }
    },

    modificarUsuario: async (req = request, res = response) => {

        try {

            const { id } = req.params
            const { name } = req.body

            const user = await User.findByIdAndUpdate(id, { name }, { new: true })
            return res.status(200).json({
                success: true,
                response: user
            })

        } catch (e) {
            return res.status(500).json({
                success: false,
                response: e
            })
        }
    },

    desactivarUsuario: async (req = request, res = response) => {

        try {

            const { id } = req.params
            const user = await User.findByIdAndUpdate(id, { status: false }, { new: true })

            return res.status(200).json({
                success: true,
                response: user
            })

        } catch (e) {
            return res.status(500).json({
                success: false,
                response: e
            })
        }
    },

    eliminarUsuario: async (req = request, res = response) => {

        try {

            const { id } = req.params

            const user = await User.findByIdAndRemove(id)

            return res.status(200).json({
                success: true,
                response: user
            })

        } catch (e) {
            return res.status(500).json({
                success: false,
                response: e
            })
        }
    },

    obtenerUsuario: async (req = request, res = response) => {

        try {

            const { id } = req.params

            const user = await User.findById(id)

            return res.status(200).json({
                success: true,
                response: user
            })

        } catch (e) {
            return res.status(500).json({
                success: false,
                response: e
            })
        }
    },

    obtenerUsuarios: async (req = request, res = response) => {

        try {

            const { limit = 5, from = 0 } = req.query

            const [total, users] = await Promise.all([
                User.countDocuments(),
                User.find().limit(Number(limit)).skip(Number(from))
            ])

            return res.status(200).json({
                success: true,
                total,
                users
            })

        } catch (e) {
            return res.status(500).json({
                success: false,
                response: e
            })
        }
    },


}


module.exports = userController