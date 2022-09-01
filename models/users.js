const {Schema, model} =require("mongoose")

const userSchema = new Schema({
    email: {type:String, required: true},
    name: {type: String, required:true},
    password: {type: String, required: true},
    position: {type: String, default: "student"},
    grade: {type: String, uppercase: true},
    assessment: {type: Object, default: {}}

})

module.exports = model("User", userSchema )