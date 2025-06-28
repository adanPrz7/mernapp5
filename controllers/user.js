//Importar dependecias y modulos
const bcrypt = require("bcrypt");
const fs = require("fs");
const path = require("path");
//Importar modelo
const User = require("../models/User");

//Importar servicios
const jwt = require("../services/jwt");


//Acciones de prueba
const pruebaUser = (req, res) => {
    return res.status(200).send({
        message: "Mensaje enviado desde: controllers/user.js",
        usuario: req.user
    });
}

//Registro de usuarios
const register = (req, res) => {
    //Obtener los datos
    let params = req.body;

    //Comprobador que llegan los datos bien
    if (!params.nameUser || !params.surname || !params.email || !params.password) {
        return res.status(400).json({
            message: "Faltan datos por enviar",
            status: "error"
        });
    }

    //Control de usuarios duplicados
    User.find({ email: params.email.toLowerCase() }).then(async (users) => {
        if (users && users.length >= 1) {
            return res.status(200).send({
                status: "success",
                message: "El usuario ya existe"
            });
        }
        //Cifrar la contraseña
        params.password = await bcrypt.hash(params.password, 10);

        //Crear un objeto de usuario
        let user_to_save = new User(params);

        //Guardar usuario en la bbdd
        user_to_save.save().then((userStored) => {
            //Devolver resultado
            return res.status(200).json({
                status: "success",
                message: "User was added",
                user: userStored.email
            });
        }).catch((error) => {
            return res.status(500).json({ status: "error", message: "error en al consulta de usuarios" });
        });
    });
}

const login = (req, res) => {
    //Obtener parametros body
    let params = req.body;
    if (!params.email || !params.password) {
        return res.status(400).send({
            status: "error",
            message: "Faltan datos por enviar"
        });
    }

    //Buscar en la bbdd si existe
    User.findOne({ email: params.email })
        //.select({"password":0})
        .then((user) => {
            if (!user) return res.status(404).send({ status: "Error", message: "No te has identificado correctamente" });
            //Comprobar su contraseña
            const pwd = bcrypt.compareSync(params.password, user.password)
            if (!pwd) {
                return res.status(400).send({
                    status: "Error",
                    message: "No te has identificado correctamente"
                })
            }
            //Devolver token
            const token = jwt.createToken(user);
            //console.log(jwt.secret);
            //Devolver datos del usuario
            return res.status(200).send({
                status: "success",
                message: "Te has identificado correctamente",
                user: {
                    id: user._id,
                    contador: user.contador
                },
                token
            })
        }).catch((error) => {
            return res.status(500).send({
                status: "Error",
                message: "Error de conexión",
                fail: error
            });
        });
}

const profile = (req, res) => {
    //Recibir el parametro del id del usuario por la url
    const params = req.body;
    if (!params.userId) {
        return res.status(400).send({
            status: "error",
            message: "Faltan datos por enviar"
        });
    }
    //Consulta para obtener los datos del usuario
    User.findById(params.userId).select({ password: 0, __v: 0 }).then(async (userProfile) => {
        if (!userProfile) return res.status(404).send({ status: "error", message: "No es posible encontrar el usuario" });

        //Devolver el resultado
        return res.status(200).send({
            status: "success",
            user: userProfile
        });
    }).catch((error) => {
        return res.status(500).send({
            status: "error",
            message: "No es posible encontrar el usuario"
        })
    });
}

const UpdateP = (req, res) => {
    let params = req.body;

    if (!params.id) {
        return res.status(400).send({
            status: "error",
            message: "faltan datos"
        });
    }
    
    User.findOneAndUpdate({
        $and: [
            { _id: params.id }            
        ]
    }, params, { new: true }).then(async (userStore) => {
        if (!userStore) return res.status(400).send({ status: "error", message: "Error al actualizar" });

        return res.status(200).send({
            status: "success",
            message: "user was update"
        });
    }).catch((error) => {
        return res.status(500).send({
            status: "error",
            message: "error en la consulta"
        });
    });
}

const UpdateC = (req, res) => {
    let params = req.body;

    if (!params.contador) {
        return res.status(400).send({
            status: "error",
            message: "faltan datos"
        });
    }
    
    User.findOneAndUpdate({
        $and: [
            { email: "adan@email.com"}        
        ]
    }, params, { new: true }).then(async (userStore) => {
        if (!userStore) return res.status(400).send({ status: "error", message: "Error al actualizar" });

        return res.status(200).send({
            status: "success",
            message: "user was update"
        });
    }).catch((error) => {
        return res.status(500).send({
            status: "error",
            message: "error en la consulta"
        });
    });
}


const getContador = (req, res) => {
    //Consulta para obtener los datos del usuario
    //findOne({numQuestion: params.numQuestion})
    User.findOne({email: "adan@email.com"}).select({ password: 0, __v: 0, nameUser:0, surname:0, email:0, created_at:0 }).then(async (userProfile) => {
        if (!userProfile) return res.status(404).send({ status: "error", message: "No es posible encontrar el usuario" });

        //Devolver el resultado
        return res.status(200).send({
            status: "success",
            user: userProfile
        });
    }).catch((error) => {
        return res.status(500).send({
            status: "error",
            message: "No es posible encontrar el usuario"
        })
    });
}


module.exports = {
    pruebaUser,
    register,
    login,
    profile,
    UpdateP,
    UpdateC,
    getContador
}
