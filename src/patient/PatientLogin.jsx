import React, { useState } from "react";
import Button from "@mui/material/Button";
import {TextField, Typography} from "@mui/material";
import Card from "@mui/material/Card";

const PatientLogin = ()=>{

    const [email , setEmail] = useState("");
    const [password , setPassword] = useState("");

    return(
        <div>
            <div style={{
                paddingTop:150,
                marginBottom:10,
                display:"flex",
                justifyContent:"center"
            }}> 
                <Typography variant={"h6"}>
                    Welcome back to B-Health . Sign in below
                </Typography>
            </div>
            
            <div style={{
                display:"flex",
                justifyContent:"center"
            }}>            
                <Card variant={"outlined"} style={{width:400, padding:20}}>
                        <TextField 
                            onChange={(e)=>{
                                setEmail(e.target.value);
                            }}
                            fullWidth={true} 
                            id={"email"}
                            label="Email" 
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
                        <Button 
                            size={"large"} 
                            variant="contained"
                            onClick={()=>{
                                
                                fetch("http://localhost:3000/patient/login",{
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
                        >
                            Sign in
                        </Button>
                    
                
                </Card>
            </div>
        </div>
    )
};

export default PatientLogin;