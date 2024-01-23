const express=require('express');
const path=require("path");
//const bcrypt=require("bcrypt");
const collection=require("./config");
const Donation=require("./mongodb");
const bcrypt = require("bcryptjs");


const app=express();

app.use(express.json());
app.use(express.urlencoded({extended:false}));

app.set('view engine','ejs');

app.use(express.static("public"));
app.get("/",(req,res)=>{
    res.render("login");
});


app.get("/signup",(req,res)=>{
    res.render("signup");
});

app.post("/signup", async (req, res) => {
    const data = {
        name: req.body.name,
        username: req.body.username,
        password: req.body.password
    }

    try {
        // Check for user existence
        const existingUser = await collection.findOne({ username: data.username });

        if (existingUser) {
            res.send("User already exists. You can login or use a different username.");
        } else {
            // Hash format for password
            const saltRounds = 10;
            const hashedPassword = await bcrypt.hash(data.password, saltRounds);
            data.password = hashedPassword;

            const userData = await collection.insertMany(data);
            console.log(userData);
            res.send("User registered successfully!");
        }
    } catch (error) {
        // Handle database or other errors gracefully
        console.error(error);
        res.status(500).send("An error occurred while registering the user.");
    }
});


// Login user
app.post("/login",async(req,res)=>{
    try{

        const check=await collection.findOne({username:req.body.username})
        if(!check){
            res.send("username cannot found");
        
        }

        const isPasswordMatch=await bcrypt.compare(req.body.password,check.password);
    if(isPasswordMatch){
        res.render("home");
    }
    else{
        req.send("wrong password");
    }

    }catch{
        res.send("wrong details enter correctly")

    }

})

app.get("/",(req,res)=>{
    res.render("home");
});

app.post('/home', async (req, res) => {
    const data = {
        name: req.body.name,
        mobileNumber: req.body.mobno,
        donationType : req.body.donation,
        address:req.body.adress,
        message:req.body.text
    }

    try {
        const userData = await Donation.insertMany(data);
        console.log(userData);
      res.status(200).json({ message: 'Donation submitted successfully!' });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Error submitting donation!' });
    }
  });


const port=3500;
app.listen(port,()=>{
    console.log('server running on port :',{port});
})