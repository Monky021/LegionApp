const Rol = require("../models/Rol");

const createRole = async() => {
   
    try {
        const rolesCount = await Rol.estimatedDocumentCount();
    
        if (rolesCount > 0){
            return;
        }
        const roles = await Promise.all([
        new Rol({name: 'Entrenador'}).save(),
        new Rol({name: 'Deportista'}).save()
        
        ])
        console.log(roles)
    } catch (error) {
        console.log(error);
        throw new Error('Contacte al adinistrador')
    }


}

module.exports ={
    createRole
}