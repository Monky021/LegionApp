const Deportista = require("../models/Deportista")


const crearDeportista = async(req, res) => {
    
    const deportista = new Deportista(req.body);
    try {

        deportista.entrenador=req.uid;
        const deportistaSaved = await deportista.save();

        return res.status(200).json({
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
}
const getDeportistas = async(req, res) => {
    
    const deportistas = await Deportista.find().populate('entrenador', 'username');


    res.status(200).json({
        ok: true,
        deportistas
    })
}
const getOneDeportista = async(req, res) => {
    
    const {id} =req.params;
    try {
        
        const deportista = await Deportista.findOne({_id:id}).populate('entrenador', 'username');
        if(!deportista){
            return res.status(404).json({
                ok: true,
                msg:'El deportista no existe en la base de datos'
            })
        }
        
        return res.status(200).json({
            ok: true,
            deportista
            
        })
    } catch (error) {
        console.log(error)
        return res.status(404).json({
            ok:false,
            msg: 'Contacte al administrador'
        });
    }
    
    
    

    
}
const editarDeportista = async(req, res) => {
    
    const {id} = req.params; 
    const uid = req.uid;
    
    try {
        const deportista = await Deportista.findById(id);
        if(!deportista){
            return res.status(404).json({
                ok: true,
                msg:'El deportista no existe en la base de datos'
            })
        }
        if(deportista.entrenador.toString() !== uid){
            return res.status(401).json({
                ok:false,
                msg:'No tiene permiso para realizar esta accion'
            })  
        }
        
        const nuevoDeportista = {
            ...req.body,
            user:uid
        }
        const updateDeportista = await Deportista.findByIdAndUpdate(id, nuevoDeportista, {new:true})
        return res.json({
            ok: true,
            deportista: updateDeportista
        })
        
    } catch (error) {
        console.log(error);
        res.status(404).json({
            ok:false,
            msg:'Contacte al administrador'
        })
    }
}
const eliminarDeportista = async(req, res) => {
    
    const {id} = req.params; 
    const uid = req.uid;
    
    try {
        const deportista = await Deportista.findById(id);
        if(!deportista){
            return res.status(404).json({
                ok: true,
                msg:'El deportista no existe en la base de datos'
            })
        }
        if(deportista.entrenador.toString() !== uid){
            return res.status(401).json({
                ok:false,
                msg:'No tiene permiso para realizar esta accion'
            })  
        }
        
        const deleteDeportista = await Deportista.findByIdAndDelete(id);
        return res.json({
            ok: true,
            deportista: deleteDeportista
        })
        
    } catch (error) {
        console.log(error);
        res.status(404).json({
            ok:false,
            msg:'Contacte al administrador'
        })
    }

    
}



module.exports = {
    crearDeportista,
    editarDeportista,
    getDeportistas,
    eliminarDeportista,
    getOneDeportista
}