const logger = require("../utils/errorManager")

const validateBody = (schema) => {
    return async (req, res, next) => {
        try {
            await schema.validate(req.body)
            next()
        } catch (error) {
            logger.error("Faltan datos para la peticion")
            return res.status(400).json({ type: error.name, message: error.message })
        }
    }
}

module.exports = validateBody