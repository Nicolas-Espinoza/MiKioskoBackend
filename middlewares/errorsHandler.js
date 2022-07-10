const { validationResult } = require('express-validator')
const { request, response } = require('express')

const errorHandler = (req = request, res = response, next) => {

    const errors = validationResult(req)

    if (!errors.isEmpty()) {

        return res.status(400).json({
            success: false,
            response: errors
        })
    }

    next()
}

module.exports = errorHandler