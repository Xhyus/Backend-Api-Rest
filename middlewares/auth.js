const logger = require('../utils/errorManager')
const { validateToken } = require('../services/token')

const auth = (req, res, next) => {
    const token = req.headers.authorization?.split(" ")[1]
    if (!token) {
        return res.status(401).json({ message: "No autorizado" })
    }
    try {
        const decoded = validateToken(token)
        req.user = decoded;
        next()
    } catch (error) {
        logger.error("Se ha intentado hacer una petición no autorizada")
        return res.status(401).json({ message: "No autorizado" })
    }
}

module.exports = auth