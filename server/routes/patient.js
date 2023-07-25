const mongoose = require('mongoose');
const express = require('express');
require('dotenv').config();
const {Patient} = require('../db/index');
const jwt = require('jsonwebtoken');
const secret = process.env.Secret;
const {authenticateJwt} = require('../middleware/auth');

const router = express.Router();

//using this route to pass on all the pages which require authentication
router.get('/me',authenticateJwt,(req,res)=>{
    res.json({
        username : req.user.username
    });
});

router.post('/signup',(req,res)=>{
    const {username , password} = req.body;
    Patient.findOne({username}).then((admin)=>{
        if(admin){
            res.status(403).json({
                message:"patient already exists",
                status_code:403
            })
        }else{
            const obj = {
                username, password
            };
            const newAdmin = new Patient(obj);
            newAdmin.save();
            const token = jwt.sign({username,role:'patient'},secret);
            res.json({
                message:"Patient created successully",
                token
            });
        }
    });
});

router.post('/login',async(req,res)=>{
    const {username, password} = req.body;
    const admin = await Patient.findOne({username,password});
    if(admin){
        const token = jwt.sign({username,role:'patient'},secret);
        res.json({
            message:"Logged in successfully",
            token
        });
    }else{
        res.status(403).json({
            message:"Invalid username or password"
        });
    }
});



