const {Schema, model} = require("mongoose");

const QuizSchema = Schema({
    numQuestion: {
        type: Number,
        require: true
    },
    pregunta: {
        type: String,
        require: true
    },
    myOpenAnswer:{
        type: String,
        require: false
    },
    openAnswer:{
        type: String,
        require: false
    },
    respuesta1:{
        type: String,
        require: false
    },
    respuesta2:{
        type: String,
        require: false
    },
    respuesta3:{
        type: String,
        require: false
    },
    respuesta4:{
        type: String,
        require: false
    },
    opcion1:{
        type: Boolean,
        require: false
    },
    opcion2:{
        type: Boolean,
        require: false
    },
    opcion3:{
        type: Boolean,
        require: false
    },
    opcion4:{
        type: Boolean,
        require: false
    },
    yourAnswer:{
        type: Boolean,
        require: false
    },
    created_at:{
        type: Date,
        default: Date.now
    }
});

module.exports = model("Quiz", QuizSchema, "quizs");