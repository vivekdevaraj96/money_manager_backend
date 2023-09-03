const mongoose=require('mongoose');

let userSchema=new mongoose.Schema({
    amount:{type:Number, required:true},
    type:{type:String,required:true},
    description:{type:String, required:true},
    category:{type:String, required:true},
    purpose:{type:String, required:true},
    year:{type:Number, required:true},
    month:{type:String, required:true},
    date:{type:Number,required:true},
    createdtime:{type:Number,required:true},
    editabletill:{type:Number, required:true}
})

let userModel=mongoose.model("transactions",userSchema)

module.exports=userModel;