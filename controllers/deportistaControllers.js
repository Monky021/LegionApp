const Deportista = require("../models/Deportista")


const crearDeportista = async(req, res) => {
    
    const deportista = new Deportista(req.body);
    try {

        deportista.entrenador=req.uid;
        const deportistaSaved = await deportista.save();

        res.status(200).json({
            ok:true,
            deportista: deportistaSaved
        })
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok:false,
            msg: 'Contacte al administrador'
        })
    }
    res.json({
        ok: true,
        msg:'Crear'
    })
}
const getDeportistas = async(req, res) => {
    
    const deportistas = await Deportista.find().populate('entrenador', 'username');


    res.status(200).json({
        ok: true,
        deportistas
    })
}
const getOneDeportista = (req, res) => {
    
    

    res.json({
        ok: true,
        msg:'obtener uno'
    })
}
const editarDeportista = (req, res) => {
    
    

    res.json({
        ok: true,
        msg:'Editar'
    })
}
const eliminarDeportista = (req, res) => {
    
    

    res.json({
        ok: true,
        msg:'Eliminar'
    })
}



module.exports = {
    crearDeportista,
    editarDeportista,
    getDeportistas,
    eliminarDeportista,
    getOneDeportista
}