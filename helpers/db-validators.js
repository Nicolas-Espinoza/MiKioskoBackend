const User = require('../models/user.model')
const Role = require('../models/role.model')

const userExist = async (id) => {

    const userExist = await User.findById(id)
    if (!userExist) {
        throw new Error(`El usuario con ID: ${id} no existe!`)
    }

}

const mailExist = async (mail) => {

    const mailExist = await User.findOne({ mail })
    if (mailExist) {
        throw new Error('El mail ya esta en uso!')
    }

}

const roleExist = async (role) => {

    const roleExist = await Role.findOne({ role })
    if (!roleExist) {
        throw new Error(`El rol: ${role} no existe! o no es valido!`)
    }

}


module.exports = {
    userExist,
    mailExist,
    roleExist
}