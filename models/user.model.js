const mongoose = require('mongoose')

const userSchema = mongoose.Schema({

    name: { type: String, required: [true, 'Nombre obligatorio! -- M'] },
    mail: { type: String, required: true },
    password: { type: String, required: true },
    avatar: { type: String, required: false },
    role: { type: String, default: 'USER_ROLE', enum: ['ADMIN_ROLE', 'USER_ROLE'] },
    status: { type: Boolean, default: true },
    google: { type: Boolean, default: false }
})

userSchema.methods.toJSON = function () {

    const { __v, password, _id, ...user } = this.toObject()

    user.uid = _id

    return user
}


module.exports = mongoose.model('user', userSchema)