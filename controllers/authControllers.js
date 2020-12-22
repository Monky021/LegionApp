const {response} = require('express');
const bcrypt = require('bcryptjs')

const Usuario =require('../models/Usuario');
const { generarJWT } = require('../helpers/jwt');
const Rol = require('../models/Rol');


const crearUsuario = async(req, res= response) => {
    const {email, password, rol} = req.body;
    try {
        let usuario = await Usuario.findOne({email})

        if (usuario){
            return res.status(400).json({
                ok: false,
                msg:'Un usuario existe con ese correo'
            })
        }
        usuario = new Usuario(req.body);
        //Encriptar contraseña
        const salt = bcrypt.genSaltSync();
        usuario.password = bcrypt.hashSync(password, salt);
        if (rol) {
            const foundRol = await Rol.find({name:'Entrenador'});
            console.log(foundRol)
            usuario.rol =foundRol.map(rol => rol._id )

        }else{
            const rol = await Rol.findOne({name: 'Deportista'});
            usuario.rol =rol._id;
        }
        
        await usuario.save();
        //generar token 
        const token =await generarJWT(usuario.id, usuario.name);

        res.status(201).json({
            ok:true,
            uid:usuario.id,
            rol:usuario.rol,
            name: usuario.name,
            token
        })

    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok:false,
            msg:'Contacte al administrador'
        })
    }
}


const loginUsuario = async(req, res) => {
    const {email, password} = req.body;

    try {
        const usuario = await Usuario.findOne({email})

        if (!usuario){
            return res.status(400).json({
                ok: false,
                msg:'El email y/o contraseña son invalidos'
            })

        }

        //confirmar passwords
        const validPassword = bcrypt.compareSync(password, usuario.password);

        if(!validPassword){
            return res.status(400).json({
                ok:false,
                msg:'El email y/o contraseña son invalidos.'
            })
        }
        //generar jwt
        const token =await generarJWT(usuario.id, usuario.username);
        console.log(usuario.username)
        res.status(200).json({
            ok:true,
            uid:usuario.id,
            name: usuario.username,
            token

        })

    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok:false,
            msg:'Contacte al administrador'
        })
    }
    
}

const revalidarToken = async(req, res) => {
    
    const  {uid, name} = req;
    //generar jwt
    const token =await generarJWT(uid, name);
    res.json({
        ok:true,
        uid,
        name,
        token
    })
}


module.exports = {
    crearUsuario,
    revalidarToken,
    loginUsuario
}