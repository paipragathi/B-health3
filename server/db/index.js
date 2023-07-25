const mongoose = require('mongoose')

const patientSchema = new mongoose.Schema({
    username: { type:String},
    password : {type:String}
});

const doctorSchema = new mongoose.Schema({
    username: { type:String},
    password : {type:String}
});

const hospitalSchema = new mongoose.Schema({
    username: { type:String},
    password : {type:String}
});

const Patient = mongoose.model('Patient',patientSchema);
const Doctor = mongoose.model('Doctor',doctorSchema);
const Hospital = mongoose.model('Hospital',hospitalSchema);

module.exports = {
    Patient,
    Doctor,
    Hospital
}

