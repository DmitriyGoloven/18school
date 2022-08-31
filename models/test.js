const {Schema, model} =require("mongoose")

const userSchema = new Schema({
    teacherID: {type:String, required: true},
    date: {type: String, required:true},
    theme: {type: String, required: true},
    grade: {type: String, uppercase: true},
    questions: {type: Object, default: {}}

})

module.exports = model("Test", userSchema )