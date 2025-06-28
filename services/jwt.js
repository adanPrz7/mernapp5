//Importat dependencias
const jwt = require("jwt-simple");
const moment = require("moment");

//K
const secret = "CLAVE_SECRETA_del_proyecto_DE_LA_RED_soCIAL_987987";

//Crear una funcion para generar tokens
const createToken = (user) => {
    const payload = {
        id: user._id,
        name: user.name,
        surname: user.surname,
        email: user.email,
        iat: moment().unix(),
        exp: moment().add(1, "days").unix()
    };
    //Devolver jwt token codificado
    return jwt.encode(payload, secret);
}

module.exports = {
    secret,
    createToken
}