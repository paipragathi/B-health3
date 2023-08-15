const mongoose = require('mongoose')

const patientSchema = new mongoose.Schema({
    
    name:{
        type:String ,
        required:true,
    },
    email:{
      type:String ,
      required:true,
      unique:true  
    },
    phone:{
        type:String,
        required:true,
        unique:true
    },
    password:{
        type:String,
        required:true,
    },
    gender:{
        type:String,
        required:true
    },
    dob:{
        type:String,
        required:true
    },
    height:{
        type:String
    },
    weight:{
        type:String
    },
    houseAddress:{
        type:String,
        required:true
    },
    bloodGroup:{
        type:String,
        required:true
    },
    allergies:{
        type:String,
    },
    emergencyName:{
        type:String,
        required:true
    },
    emergencyContact:{ 
        type:String,
        required:true
    },
    walletAddress:{
        type:String,
    },
    dateOfRegistration:{
        type:String,
    }
});

const Patient = mongoose.model('Patient',patientSchema);

module.exports = {
    Patient,
}

