const mongoose = require('mongoose');

const doctorSchema = new mongoose.Schema({
    
    name:{
        type:String,
        required:true
    },
    phone:{
        type:String,
        required:true,
        unique:true
    },
    email:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true,
    },
    gender:{
        type:String,
        required:true,
    },
    dob:{
        type:String,
        required:true
    },
    qualification:{
        type:String,
        required:true
    },
    major:{
        type:String,
        required:true
    },
    walletAddress:{
        type:String,
        require: true
    },
    dateOfRegistration:{
        type:String,
    }
});

const Doctor = mongoose.model('Doctor',doctorSchema);

module.exports = {
    Doctor,
}
