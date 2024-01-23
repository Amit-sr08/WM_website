const mongoose=require("mongoose");
const connect=mongoose.connect("mongodb://127.0.0.1:27017/Login-tut");
connect.then(()=>{
    console.log("mongodb connected");
})
.catch((err)=>{
    console.log("failed to connect:",err);
});

const donationSchema = new mongoose.Schema({
    name:{ 
        type:String,
        required:true
    },
   mobileNumber :{ 
        type:String,
        required:true
    },
    donationType:{ 
        type:String,
        required:true
    },
    address:{ 
        type:String,
        required:true
    },
    message:{ 
        type:String,
        required:true
    }
    
  });

const collection = mongoose.model('Donation', donationSchema);
module.exports=collection;





