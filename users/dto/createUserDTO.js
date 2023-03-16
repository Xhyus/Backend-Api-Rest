const yup = require('yup')
const createUserDTO = yup.object({
    name: yup.string().required().trim(),
    lastname: yup.string().required(),
    email: yup.string().email().required(),
    password: yup.string().required(),
    repassword: yup.string().oneOf([yup.ref("password"), null], "Las contraseñas deben ser iguales"),
    role: yup.string().required(),
})

module.exports = createUserDTO