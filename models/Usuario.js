const {Schema, model} = require('mongoose');

const UsuarioSchema = Schema({

    username:{
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true,
    },
    
    rol:{
        ref:"Rol",
        type: Schema.Types.ObjectId,
    }




})

module.exports = model('Usuario', UsuarioSchema );