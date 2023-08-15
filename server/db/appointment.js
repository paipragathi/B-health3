const mongoose = require('mongoose');

const appointmentSchema = new mongoose.Schema({
    
    doctorAddress:{
        type:String,
        required:true,     
    },
    doctorName:{
        type:String,
        required:true,
    },
    patientAddress:{
        type:String,
        required:true
    },
    patientName:{
        type:String,
        required:true
    },
    date:{
        type:String,
        required:true
    },
    time:{
        type:String,
        required:true
    },
    symptoms:{
        type:String,
        required:true
    },
    department:{
        type:String,
    },
    referingDoctor:{
        type:String,
    },
    emergencyStatus:{
        type:String,
        required:true
    },
    appointmentStatus:{
        type:String,
    },
    creationDate:{
        type:String
    }
});

const Appointment = mongoose.model('Appointment',appointmentSchema);

module.exports = {
    Appointment,
}
