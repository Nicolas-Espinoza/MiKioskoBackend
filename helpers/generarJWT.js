const jwt = require('jsonwebtoken')


const generarJWT = async (uid) => {

    const payload = { uid }

    const token = jwt.sign(payload, process.env.SECRETORPUBLICKEY, {
        expiresIn: '365d'
    })

    return token
}


module.exports = generarJWT