const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors')


const user = require('./users/user.routes')

const app = express()
app.use(cors())
app.use(express.json())
app.options('*', cors())
app.use('/api/v1', user)

app.listen(3000, () => console.log('Se ha conectado al backend'))

mongoose.connect("mongodb://localhost:27017")
    .then(() => console.log('Se ha conectado a la base de datos'))