const mongoose = require('mongoose')

const dbConnection = async () => {

    try {

        mongoose.connect(process.env.MONGO_CNN, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        })
        console.log('db connected!')

    } catch (error) {
        console.log('error db connection', error)
        throw new Error('error en la conexion DB')
    }
}


module.exports = dbConnection