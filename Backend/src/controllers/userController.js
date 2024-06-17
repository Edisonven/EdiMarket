const {
    consultarUsuario,
    consultarUsuarioById,
    registrarUsuario,
    verificarUsuario,
    consultarCategorias,
    agregarDirreccion,
    consultarDirreccion
}= require("../models/userModel");
const prepHateoas= require("../models/hateoasModel");

const jwt = require("jsonwebtoken");

const getAllUsers= async (req, res) => {
    try {
        const usuarios = await consultarUsuario();
        res.send(usuarios);
    } catch (error) {
        res.status(500).send(error);
    }
}

const getUserById= async (req, res) => {
    try {
        const { id } = req.params;
        const usuario = await consultarUsuarioById(id);
        res.send(usuario);
    } catch (error) {
        res.status(500).send(error);
    }
}

const registrarUser= async (req, res) => {
    try {
        const usuario = req.body;
        await registrarUsuario(usuario);
        res.status(201).json({
            nombre: usuario.nombre,
            email: usuario.email,
            contraseña: usuario.contraseña,
        });
    } catch (error) {
        res.status(500).send(error.message);
    }
}

const loginUser= async (req, res) => {
    try {
        const { email, contraseña } = req.body;
        const user = await verificarUsuario(email, contraseña);
        const token = jwt.sign({ email: user.email, id: user.id }, process.env.JWT_SECRET);
        res.status(200).json({
            token,
        });
    } catch (error) {
        res.status(500).send(error.message);
    }
}

const consultarCategoria= async (req, res) => {
    try {
        const categorias = await consultarCategorias();
        res.send(categorias);
    } catch (error) {
        res.status(500).send(error);
    }
}

const agregarDomicilio= async (req, res) => {
    try {
        const domicilio = req.body;
        const Authorization = req.header("Authorization");
        const token = Authorization.split("Bearer ")[1];
        jwt.verify(token, process.env.JWT_SECRET);
        const { email,id } = jwt.decode(token);
        await agregarDirreccion(domicilio, id);
        console.log(`El usuario ${email} con el id ${id} ha agregado un domicilio`);
        res.status(201).json({
            direccion: domicilio.direccion,
            ciudad: domicilio.ciudad,
            region: domicilio.region,
            codigo_postal: domicilio.codigo_postal,
        });
    }
    catch (error) {
        res.status(500).send(error.message);
    }
}

const consultarDomicilio= async (req, res) => {
    try {
        const Authorization = req.header("Authorization");
        const token = Authorization.split("Bearer ")[1];
        jwt.verify(token, process.env.JWT_SECRET);
        const { email,id } = jwt.decode(token);
        const domicilio = await consultarDirreccion(id);
        console.log(`El usuario ${email} con el id ${id} ha consultado su domicilio`);
        res.json({
            Domicilios: domicilio.map((domicilio)=>{
                return {
                    direccion: domicilio.direccion,
                    ciudad: domicilio.ciudad,
                    region: domicilio.region,
                    codigo_postal: domicilio.codigo_postal,
                }
            })
        });
    }
    catch (error) {
        res.status(500).send(error.message);
    }
}


module.exports = {
    getAllUsers, getUserById,registrarUser,loginUser,consultarCategoria,agregarDomicilio,consultarDomicilio
}