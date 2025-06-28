//Importar modelo
const Quiz = require("../models/Quiz");

//Importar servicios
const jwt = require("../services/jwt");


//Acciones de prueba
const pruebaQuiz = (req, res) => {
    return res.status(200).send({
        message: "Mensaje enviado desde: controllers/quiz.js",
        //usuario: req.user
    });
}

//Registro de usuarios
const register = (req, res) => {
    //Obtener los datos
    let params = req.body;

    //Comprobador que llegan los datos bien
    if (!params.numQuestion || !params.pregunta) {
        return res.status(400).json({
            message: "Faltan datos por enviar",
            status: "error"
        });
    }

    //Control de usuarios duplicados
    Quiz.find({ numQuestion: params.numQuestion }).then(async (quizs) => {
        if (quizs && quizs.length >= 1) {
            return res.status(200).send({
                status: "success",
                message: "Ya existe la pregunta"
            });
        }

        //Crear un objeto de usuario
        let quizToSave = new Quiz(params);

        //Guardar usuario en la bbdd
        quizToSave.save().then((quizStore) => {
            //Devolver resultado
            return res.status(200).json({
                status: "success",
                message: "Question was added",
                pregunta: quizStore.pregunta
            });
        }).catch((error) => {
            return res.status(500).json({ status: "error", message: "error en al consulta de preguntas" });
        });
    });
}

const quizDescription = (req, res) => {
    //Recibir el parametro del id del usuario por la url
    const params = req.body;
    if (!params.numQuestion) {
        return res.status(400).send({
            status: "error",
            message: "Faltan datos por enviar"
        });
    }
    //Consulta para obtener los datos del usuario
    //.findOne({ qrCode: params.qrCode })
    Quiz.findOne({numQuestion: params.numQuestion}).select({ __v: 0 }).then(async (QuizDescription) => {
        if (!QuizDescription) return res.status(404).send({ status: "error", message: "No es posible encontrar la pregunta" });

        //Devolver el resultado
        return res.status(200).send({
            status: "success",
            question: QuizDescription
        });
    }).catch((error) => {
        return res.status(500).send({
            status: "error",
            message: "No es posible encontrar la pregunta"
        })
    });
}

const updateQ = (req, res) => {
    let params = req.body;

    if (!params.id) {
        return res.status(400).send({
            status: "error",
            message: "faltan datos"
        });
    }
    
    Quiz.findOneAndUpdate({
        $and: [
            { _id: params.id }            
        ]
    }, params, { new: true }).then(async (quizStore) => {
        if (!quizStore) return res.status(400).send({ status: "error", message: "Error al actualizar" });

        return res.status(200).send({
            status: "success",
            message: "quiz was update"
        });
    }).catch((error) => {
        return res.status(500).send({
            status: "error",
            message: "error en la consulta"
        });
    });
}


const getAllQuestion = (req, res) => {
    Quiz.find().select().then(async (quizList) => {
        if (!quizList) return res.status(404).send({ status: "error", message: "No hay participantes" });

        return res.status(200).send({
            status: "success",
            message: "Econtrado",
            quizList
        });

    }).catch((error) => {
        return res.status(500).send({
            status: "error",
            message: "error en la consulta"
        });
    });
}

module.exports = {
    pruebaQuiz,
    register,
    quizDescription,
    updateQ,
    getAllQuestion
}
