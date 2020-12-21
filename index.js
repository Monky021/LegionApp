const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const dbConnection = require('./database/DBconfig');
const { createRole } = require('./controllers/roleControllers');

dotenv.config();

//iniciar el servidor
const app = express();
createRole();

//corse
app.use(cors())
//base de datos
dbConnection();
//publico
app.use(express.static('public'))
//lectura y parceo del body
app.use(express.json())

//Rutas
app.use('/api/auth', require('./routes/authRoute'));
app.use('/api/deportista', require('./routes/deportistaRoute'));
//Escuchar peticiones 
app.listen(process.env.PORT, ()=>{
    console.log(`Servidor en el puerto: ${process.env.PORT}`)
} )