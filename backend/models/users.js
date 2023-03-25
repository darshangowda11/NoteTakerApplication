const mongoose = require("mongoose")
const {model, Schema} = mongoose;

const userSchema = Schema({
    email:{type:String, required:true},
    password:{type:String, required:true}
})

const userModel = model("users", userSchema);
module.exports = userModel;