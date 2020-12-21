const {Schema, model} = require('mongoose');

const RolSchema = new Schema({
    name: {
        type:String,
    }
},{
    versionKey:false
})
module.exports = model('Rol', RolSchema);