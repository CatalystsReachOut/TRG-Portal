  import mongoose  from "mongoose";
  import validator from "validator";
  import bcrypt from "bcryptjs";
  import jwt from "jsonwebtoken";
  import crypto from "crypto";


const jobseekerSchema = new mongoose.Schema({
  name:{
    type: String,
    maxlength: [80 , 'Name should not be more then 80 characters.']
  },
  email:{
    type:String,
    required:[true,'Please provide an email'],
    validate:[validator.isEmail,'Please enter email in correct format'],
    unique:true
  },
  password:{
    type: String,
    minlength:[6,"Password should be of atleast 6 characters."],
  },
  experience:{
    type:Number
  },
  education:{
    type: String
  },
  skills:[{
    type:String
  }],
  bio:{
    type: String,
    maxlength: [350 , 'Bio should not be more then 350 characters,']
  },
  resume:[{
    id:{
      type:String
    },
    secure_url:{
      type:String
    }
  }],
  profile_img:[{
    id:{
      type:String
    },
    secure_url:{
      type:String
    }
  }]
})
  
const Jobseeker = new mongoose.model("Jobseeker" , jobseekerSchema);

export default Jobseeker;
