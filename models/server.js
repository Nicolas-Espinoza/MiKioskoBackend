const express = require('express')
const cors = require('cors')
const dbConnection = require('../database/config')

const userRouter = require('../routes/user.routes')
const authRouter = require('../routes/auth.routes')


class Server {

    constructor() {
        this.app = express()
        this.port = process.env.PORT
        this.connectDB()
        this.middlewares()
        this.routes()
    }

    startServer() {
        this.app.listen(this.port, () => {
            console.log(`App is running on port ${this.port}`)
        })
    }

    middlewares() {
        this.app.use(cors())
        this.app.use(express.json())
        this.app.use(express.static('public'))
    }

    routes() {
        this.app.use('/api/user', userRouter)
        this.app.use('/api/auth', authRouter)
    }

    connectDB() {
        dbConnection()
    }
}

module.exports = Server