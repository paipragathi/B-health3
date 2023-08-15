const express =require('express');
const mongoose = require('mongoose');
const cors  = require('cors');
const patientRouter = require('./routes/patient');
const doctorRouter = require('./routes/doctor');
const hospitalRouter = require('./routes/hospital');
require('dotenv').config();
const mongo_url = 'mongodb+srv://karnpiyushkarn:MNMpk2k13@cluster0.d5iuvdx.mongodb.net/';

const app = express();

app.use(express.json());
app.use(cors());
app.use('/patient',patientRouter);
app.use('/doctor',doctorRouter);
app.use('/hospital',hospitalRouter);

app.use((req,res,next)=>{
    res.header('Content-Type',"application/json;charset=UTF-8")
    res.header('Access-Control-Allow-Credentials',true)
    res.header(
        'Access-Control-Allow-Headers',
        'Origin, X-Requested-With, Content-Type,Accept'
    )
    next()
});

mongoose.connect(mongo_url , {
    useNewUrlParser:true,
    useUnifiedTopology: true,
    dbName:"B-Health"
});

app.listen(3000,()=>{
    console.log("Server is running on port 3000...");
})
