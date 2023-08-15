const mongoose = require('mongoose');

const hospitalSchema = new mongoose.Schema({
    hospitalId:{
        type:String,
        unique:true,
        required:true,
    },
    password:{
        type:String,
        required:true
    }
});

const Hospital = mongoose.model('Hospital',hospitalSchema);

module.exports = {Hospital};