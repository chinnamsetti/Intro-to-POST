const mongoose=require("mongoose");
const express=require("express");
const cors=require("cors");
let app=express();
app.use(cors());
app.use(express.json());

let userSchema=new mongoose.Schema({
    firstName:{
        type: String,
        validate: {
          validator: function(v) {
            return /^[A-Za-z ]{2,20}$/.test(v);
          },
          message: props => `${props.value} is not a valid First Name!`
        },
        required: [true, 'User First Name required']
      },
    lastName:{
        type: String,
        validate: {
          validator: function(v) {
            return /^[A-Za-z]{2,20}$/.test(v);
          },
          message: props => `${props.value} is not a valid email!`
        },
        required: [true, 'User email required']
      },
    age:{
        type:Number,
        min:[13,"Too early to create an Account"],
        max:[70,"Too late to create an Account"],
        required:[true,"Age is mandatory"],
    },
    email:{
        type: String,
        validate: {
          validator: function(v) {
            return /[a-zA-Z0-9._%+-]+@gmail\.com$/.test(v);
          },
          message: props => `${props.value} is not a valid email!`
        },
        required: [true, 'User email required']
      },
    password:{
        type: String,
        validate: {
          validator: function(v) {
            return /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{8,}$/.test(v);
          },
          message: props => `${props.value} is not a valid email!`
        },
        required: [true, 'User email required']
      },
    mobileNo:{
        type: String,
        validate: {
          validator: function(v) {
            return /^\+91[\s-]?\d{10}$|^\+91[\s-]?\d{3}[\s-]?\d{3}[\s-]?\d{4}$/.test(v);
          },
          message: props => `${props.value} is not a valid MobileNo!`
        },
        required: [true, ' use MobileNo required']
      },
});

let User=new mongoose.model("users",userSchema);


app.post("/signup",async(req,res)=>{
    console.log(req.body);

    try{
        let signedUpDetails=new User({
            firstName:req.body.firstName,
            lastName:req.body.lastName,
            age:req.body.age,
            email:req.body.email,
            password:req.body.password,
            mobileNo:req.body.mobileNo,
        });
    
      await User.insertMany([signedUpDetails]);
      res.json({status:"success",msg:"You can able to Create an Account"});
    }catch(err){
    res.json({status:"failure",msg:"Unable to create an account",error:err});
    }
})

app.listen(1405,()=>{
    console.log(`Listening to the port 1405`)
})
let connectToMDB=async()=>{
try{
     await mongoose.connect("mongodb+srv://akhilchinnamsetti:akhilch1405@batch2403.derqdcc.mongodb.net/Amazone?retryWrites=true&w=majority&appName=batch2403");
     console.log("Successfully connected to MDB");
}catch(err){
     console.log("Unable to connect to MDB");
     console.log(err)
}
};
connectToMDB();