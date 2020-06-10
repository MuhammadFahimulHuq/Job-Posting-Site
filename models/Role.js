const mongoose= require('mongoose');
const Schema = mongoose.Schema;


let roleSchema = new Schema({
    roleBased:{
    type:Schema.Types.ObjectId,ref:'User'
    },
    roleName:{
    type:String,
    required:true
}

})
module.exports=mongoose.model('Role',roleSchema);