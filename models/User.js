const {Schema, model} = require("mongoose");
const { default: isEmail } = require("validator/lib/isEmail");
const UserSchema = Schema({
    nameUser: {
        type: String,
        require: true
    },
    surname: {
        type: String,
        require: true
    },
    email:{
        type: String,
        require: true
    },
    password:{
        type: String,
        require: true
    },
    contador:{
        type: Number,
        require: true
    },
    created_at:{
        type: Date,
        default: Date.now
    }
});

module.exports = model("User", UserSchema,"users");