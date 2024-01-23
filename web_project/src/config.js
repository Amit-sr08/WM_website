const mongoose=require("mongoose");
const connect=mongoose.connect("mongodb://127.0.0.1:27017/Login-tut");
connect.then(()=>{
    console.log("mongodb connected");
})
.catch((err)=>{
    console.log("failed to connect:",err);
});

const LoginSchema=new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    username:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true
    }
});

const collection=new mongoose.model("users",LoginSchema);
module.exports=collection;





