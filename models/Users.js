
const mongoose= require('mongoose');
const Schema = mongoose.Schema;
const role = require('./Role')

const userSchema = new Schema({
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
   role:{
       type:String,
       required:true
   }

});

module.exports=mongoose.model('User',userSchema);
