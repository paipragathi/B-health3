const mongoose = require('mongoose');
const express = require('express');
require('dotenv').config();
const {Hospital} = require('../db/hospital');
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
    const {hospitalId , password} = req.body;
    Hospital.findOne({hospitalId}).then((admin)=>{
        if(admin){
            res.status(403).json({
                message:"hospital already exists",
                status_code:403
            })
        }else{
            const obj = {
                username, password
            };
            const newAdmin = new Hospital(obj);
            newAdmin.save();
            const token = "Bearer "+ jwt.sign({username,role:'hospital'},secret);
            res.json({
                message:"hospital created successully",
                token
            });
        }
    });
});

router.post('/login',async(req,res)=>{
    const {username, password} = req.body;
    const admin = await Hospital.findOne({username,password});
    if(admin){
        const token ="Bearer "+ jwt.sign({username,role:'hospital'},secret);
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


module.exports = router;
