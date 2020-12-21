const {Schema, model} = require('mongoose');



const DeportistaSchema = Schema({

    name: {
        type: String,
        required: true,
    },

    identificacion: {
        type: String,
        required: true,
        
    },
    fechaNacimiento: {
        type: Date,
    },
    categoria: {
        type: String,
    },
    posicion:{
        type: String,
    },
    peso: {
        type: Number,
    },
    talla: {
        type: Number
    },
    alcance: {
        type: Number
    },
    bloqueo: {
        type: Number
    },
    ataque: {
        type: Number
    },
    entrenador:{
        type: Schema.Types.ObjectId,
        ref:'Usuario',
        required: true
    }


})

DeportistaSchema.method('toJSON', function(){
    const {__v, _id, ...object} = this.toObject();
    object.id=_id
    return object;
})
module.exports = model('Deportista', DeportistaSchema);