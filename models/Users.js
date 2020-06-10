
const mongoose= require('mongoose');

const userSchema = new mongoose.Schema({
    firstName:{
        type:String,
        required:true,
        min: 4,
        max: 255,
    },
    lastName:{
        type:String,
        required:true,
        min: 4,
        max: 255,
    },
    password:{
        type:String,
        required:true,
        min:5,
        max:50,
    },
    careerLevel:{
        type:String,
        required:true,
        min: 4,
        max: 255,
    },
    educationLevel:{
        type:String,
        required:true,
        min: 4,
        max: 255,
    },
    email:{
        type:String,
        required:true,
        min: 4,
        max: 255,
    },
    zipCode:{
        type:Number,
        required:true,
        min:2
     

    },

});
module.exports=mongoose.model('User',userSchema);
