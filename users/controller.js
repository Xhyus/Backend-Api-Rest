const User = require('./model')
const logger = require('../utils/errorManager')
const bcrypt = require('bcrypt')
const { generateToken } = require('../services/token')

const createUser = async (req, res) => {
    let { name, lastname, role, email, password } = req.body
    email = email.toLowerCase()
    try {
        let hashpass = await bcrypt.hash(password, 10)
        const newUser = new User({ name, lastname, role, email, password: hashpass })
        await newUser.save()
        return res.status(200).json({ message: "Se ha registrado de forma correcta el usuario!" })
    } catch (error) {
        logger.error(`Se ha generado el siguiente error: ${error}`)
        return res.status(400).json({ message: "Ha ocurrido un error al guardar el usuario" })
    }
}

const getUsers = async (req, res) => {
    try {
        const users = await User.find({})
        return res.status(200).json({
            message: "Se han encontrado los siguientes usuarios:",
            users
        })
    } catch (error) {
        logger.error(`Se ha generado el siguiente error: ${error}`)
        return res.status(400).json({ message: "Ha ocurrido un error al obtener los usuarios" })
    }
}

const login = async (req, res) => {
    const { email, password } = req.body
    try {
        let user = await User.findOne({ email })
        if (!user) {
            return res.status(404).json({ message: "El usuario no existe" })
        }
        let isPasswordValid = await bcrypt.compare(password, user.password)
        if (!isPasswordValid) {
            throw new Error("La contraseña no es correcta")
        }
        return res.status(200).json({
            user,
            token: generateToken(user)
        })
    } catch (error) {
        logger.error("Intento de inicio de sesion fallido")
        return res.status(400).json({
            message: "Error al intentar iniciar sesion"
        })
    }
}

module.exports = {
    createUser,
    getUsers,
    login
}