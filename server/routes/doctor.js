const mongoose = require('mongoose');
const express = require('express');
require('dotenv').config();
const {Doctor} = require('../db/doctor')
const jwt = require('jsonwebtoken');

const {authenticateJwt,secret} = require('../middleware/auth');

const router = express.Router();

//using this route to pass on all the pages which require authentication
router.get('/me',authenticateJwt,(req,res)=>{
    res.json({
        username : req.user.username
    });
});

router.post('/signup',(req,res)=>{
    const { name, email,phone ,password, dob, gender,qualification,major,walletAddress, dateOfRegistration } = req.body;
    Doctor.findOne({email, walletAddress}).then((admin)=>{
        if(admin){
            res.status(403).json({
                message:"doctor already exists",
                status_code:403
            })
        }else{
            const obj = {
                 name, email,phone ,password,dob,  gender,qualification,major,walletAddress, dateOfRegistration
            };
            const newAdmin = new Doctor(obj);
            newAdmin.save();
            const token ="Bearer "+  jwt.sign({email,role:'doctor'},secret);
            res.json({
                message:"doctor created successully",
                token
            });
        }
    });
});

router.post('/login',async(req,res)=>{
    const {email, password} = req.body;
    const admin = await Doctor.findOne({email,password});
    if(admin){
        const token ="Bearer "+  jwt.sign({email,role:'doctor'},secret);
        res.json({
            message:"Doctor logged in successfully",
            token
        });
    }else{
        res.status(403).json({
            message:"Invalid username or password"
        });
    }
});



module.exports = router;