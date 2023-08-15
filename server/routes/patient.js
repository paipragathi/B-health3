const mongoose = require('mongoose');
const express = require('express');
require('dotenv').config();
const {Patient}  = require('../db/patient');
const {Appointment} = require('../db/appointment');
const jwt = require('jsonwebtoken');
// const secret = process.env.Secret;

const {authenticateJwt,secret} = require('../middleware/auth');

const router = express.Router();

//using this route to pass on all the pages which require authentication
router.get('/me',authenticateJwt,async(req,res)=>{
    const patient = await Patient.findOne({email:req.user.email});
    if(!patient) {
        res.status(403).json({
            message:"Patient does not exist"
        })
    }else{
        res.json({
            email:patient.email
        })
    }
});

router.post('/signup',(req,res)=>{
    const { name, email,phone ,password, gender,dob,height, weight,houseAddress ,bloodGroup, allergies, emergencyName,emergencyContact ,walletAddress, dateOfRegistration } = req.body;
    Patient.findOne({email}).then((admin)=>{
        if(admin){
            res.status(403).json({
                message:"patient already exists",
                status_code:403
            })
        }else{
            const obj = {
                name, email,phone ,password,  gender,dob,height, weight,houseAddress ,bloodGroup, allergies, emergencyName,emergencyContact ,walletAddress, dateOfRegistration
            };
            const newAdmin = new Patient(obj);
            newAdmin.save();
            const token = "Bearer "+ jwt.sign({email,role:'patient'},secret);
            res.json({
                message:"Patient created successully",
                token
            });
        }
    });
});

router.post('/login',async(req,res)=>{
    const {email, password} = req.body;
    const admin = await Patient.findOne({email,password});
    if(admin){
        const token ="Bearer "+ jwt.sign({email,role:'patient'},secret);
        res.json({
            message:"Patient logged in successfully",
            token,
            email
        });
    }else{
        res.status(403).json({
            message:"Invalid username or password"
        });
    }
});

router.post('/appointment', authenticateJwt, async(req,res)=>{

    const appointment = new Appointment(req.body);
    await appointment.save();
    res.json({
        message:"Appointment saved successfully",
        appointmentId: appointment.id
    });

});

router.put('/appointment/:appointmentId', authenticateJwt, async(req,res)=>{
    const appointment = await Appointment.findByIdAndUpdate(req.params.appointmentId, req.body, {new:true});
    try {
        if(appointment){
            res.json({
                appointment,
                message:"Appointment update successfully",
            });
        }
    } catch (error) {
        res.status(400).json({
            message:"Appointment update failed"
        });
    }
});

router.get('/appointment',authenticateJwt, async(req,res)=>{
    const appointments = await Appointment.find({});
    try {
        if(appointments){
            res.json({appointments});
        }
    } catch (error) {
        res.status(400).json({
            message:"appointments not found"
        });
    }
});

router.get('/appointment/:appointmentId',authenticateJwt , async (req, res) => {
    const appointment = await Appointment.findById(req.params.appointmentId);
    try {
        if(appointment){
            res.json({appointment})
        }
    } catch (error) {
        res.status(404).json({
            messgae:"Appointment not found"
        })
    }
});



module.exports = router;



