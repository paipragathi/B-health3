import React, { useState } from "react";
import Button from "@mui/material/Button";
import { TextField,Typography } from "@mui/material";
import Card from "@mui/material/Card";



const PatientSignup = ()=>{

    const [name ,setName] = useState("");
    const [email ,setEmail] = useState("");
    const [phone ,setPhone] = useState("");
    const [password ,setPassword] = useState("");
    const [gender ,setGender] = useState("");
    const [dob ,setDob] = useState("");
    const [height ,setHeight] = useState("");
    const [weight ,setWeight] = useState("");
    const [houseAddress ,setHouseAddress] = useState("");
    const [bloodGroup ,setBloodGroup] = useState("");
    const [allergies ,setAllergies] = useState("");
    const [emergencyName ,setEmergencyName] = useState("");
    const [emergencyContact ,setEmergencyContact] = useState("");
    const [walletAddress ,setWalletAddress] = useState("");
    const [dateOfRegistration ,setDateOfRegistration] = useState("");


    return(
        <div>
            <div style={{
                paddingTop:150,
                marginBottom:10,
                display: "flex",
                justifyContent: "center"
            }}>
                <Typography variant={"h6"}>
                    Welcome to B-Health . Please sign up to create you account.
                </Typography>
            </div>

            <div style={{
                display: "flex",
                justifyContent: "center"
            }}>
                <Card variant={"outlined"} style={{width:400, padding:20}}>
                    <TextField 
                        onChange={(e)=>{
                            setName(e.target.value);
                        }}
                        fullWidth={true} 
                        label="Name" 
                        variant="outlined" 
                    />
                    <br /><br />
                    <TextField 
                        onChange={(e)=>{
                            setEmail(e.target.value);
                        }}
                        fullWidth={true} 
                        label="Email" 
                        variant="outlined" 
                    />
                    <br /><br />
                    <TextField 
                        onChange={(e)=>{
                            setPhone(e.target.value);
                        }}
                        fullWidth={true} 
                        label="Mobile Number" 
                        variant="outlined" 
                    />
                    <br /><br />
                    
                    <TextField 
                        onChange={(e)=>{
                            setPassword(e.target.value);
                        }}
                        fullWidth={true} 
                        id={"outlined-password-input"} 
                        label="Password" 
                        variant="outlined"  
                        autoComplete="current-password"
                        type="password"  
                    />
                    <br /><br />
                    <TextField 
                        onChange={(e)=>{
                            setGender(e.target.value);
                        }}
                        fullWidth={true} 
                        label="Gender" 
                        variant="outlined" 
                    />
                    <br /><br />
                    
                    <TextField 
                        onChange={(e)=>{
                            setDob(e.target.value);
                        }}
                        fullWidth={true} 
                        label="DOB" 
                        variant="outlined" 
                    />
                    <br /><br />

                    <TextField 
                        onChange={(e)=>{
                            setHeight(e.target.value);
                        }}
                        fullWidth={true} 
                        label="Height"  
                        variant="outlined" 
                    />
                    <br /><br />
                    
                    <TextField 
                        onChange={(e)=>{
                            setWeight(e.target.value);
                        }}
                        fullWidth={true} 
                        label="Weight"  
                        variant="outlined" 
                    />
                    <br /><br />

                    <TextField 
                        onChange={(e)=>{
                            setHouseAddress(e.target.value);
                        }}
                        fullWidth={true} 
                        label="Address"  
                        variant="outlined" 
                    />
                    <br /><br />

                    <Button
                        size={"large"} 
                        variant="contained"
                        onClick= {async()=>{
                                await fetch("http://localhost:3000/patient/signup",{
                                    method:'POST',
                                    body:JSON.stringify({
                                        email,
                                        password
                                    }),
                                    headers:{
                                        "Content-type":"application/json"
                                    }
                                }).then((res)=>{
                                    return res.json()
                                }).then(data=>{
                                    localStorage.setItem("token",data.token)
                                    console.log(data)
                                    window.location = "/patient";
                                })
                        }}

                    >Sign up</Button>
                
            
            </Card>
            </div>
        </div>
    )
}

export default PatientSignup;