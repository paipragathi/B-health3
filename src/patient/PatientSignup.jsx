import React, { useState } from "react";
import Button from "@mui/material/Button";
import { TextField,Typography } from "@mui/material";
import Card from "@mui/material/Card";
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import EHR from "../artifacts/contracts/EHR.sol/EHR.json";
import Reward from '../artifacts/contracts/Reward.sol/Reward.json';


const PatientSignup = ()=>{

    const [account,setAccount] = useState("");
  const [ehrContract ,setEhrContract] = useState(null);
  const [rewardContract ,setRewardContract] = useState(null);
  const [provider ,setProvider] = useState(null);
  const [email ,setEmail] = useState("");
  const [walletAddress ,setWalletAddress] = useState("");

  useEffect(()=>{
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const loadProvider = async()=>{
      if(provider){
        window.ethereum.on("chainChanged", () => {
          window.location.reload();
        });

        window.ethereum.on("accountsChanged", () => {
          window.location.reload();
        });
        await provider.send("eth_requestAccounts",[]);
        const signer = provider.getSigner();
        const address = await signer.getAddress();
        setAccount(address);
        setWalletAddress(address);

        let ehrContractAddress = '0x897F6B5f3a44096AE8DE19f7f413b94370868A8a';
        let rewardContractAddress = '0x8824b9479f9C217f7BB28FBEaC728A1118e2B48C';

        const ehrContract = new ethers.Contract(
          ehrContractAddress, EHR.abi , signer
        );

        console.log(ehrContract);
        setEhrContract(ehrContract);
        
        const rewardContract = new ethers.Contract(
          ehrContractAddress, EHR.abi,signer
        );
        console.log(rewardContract);
        setRewardContract(rewardContract);

        setProvider(provider);

      }else{
        console.error("Metamask not installed")
      }
    }
    provider && loadProvider();

    fetch('http://localhost:3000/patient/me', {
      method: 'GET',
      headers:{
        'Authorization': 'Bearer ' + localStorage.getItem('token')
      }
    }).then((res)=>{
      res.json().then((data)=>{
        setEmail(data.email)
      })
    })
  },[])

    const [name ,setName] = useState("");
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
                    <Select defaultValue="Gender"
                        onChange = {(e)=>{
                            setGender(e.target.value);
                        }}
                    >
                        <Option value="Male">Male</Option>
                        <Option value="Female">Female</Option>
                    </Select>
                    <br /><br />
                    
                    <DatePicker  onChange={(e)=>{
                        setDob(e.target.value);
                    }}/>
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
                                const newDate = new Date;
                                setDateOfRegistration(newDate.getDate());
                                await fetch("http://localhost:3000/patient/signup",{
                                    method:'POST',
                                    body:JSON.stringify({
                                        name, email,phone ,password, gender,dob,height, weight,houseAddress ,bloodGroup, allergies, emergencyName,emergencyContact ,walletAddress, dateOfRegistration
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