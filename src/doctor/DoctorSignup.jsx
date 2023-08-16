import React, { useState } from "react";

const DoctorSignup = ()=>{
    const [name, setName] = useState("");
    const [phone, setPhone] = useState("");
    const [password, setPassword] = useState("");
    const [dob , setDob] = useState("");
    const [gender, setGender] = useState("");
    const [qualification, setQualification] = useState("");
    const [major , setMajor] = useState("");
    const [date, setDate] = useState("")
    const [account,setAccount] = useState("");
  const [ehrContract ,setEhrContract] = useState(null);
  const [rewardContract ,setRewardContract] = useState(null);
  const [provider ,setProvider] = useState(null);
  const [email ,setEmail] = useState("");
// name, email,phone ,password, dob, gender,qualification,major,walletAddress, dateOfRegistration 
    
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
                            setMajor(e.target.value);
                        }}
                        fullWidth={true} 
                        label="Major" 
                        variant="outlined" 
                        
                    />
                    <br /><br />

                    <TextField 
                        onChange={(e)=>{
                            setQualification(e.target.value);
                        }}
                        fullWidth={true} 
                        label="Qualification" 
                        variant="outlined" 
                        height = "100px"
                    />
                    <br /><br />

                    <Button
                        size={"large"} 
                        variant="contained"
                        onClick= {async()=>{
                                const newDate = new Date;
                                setDateOfRegistration(newDate.getDate());
                                await fetch("http://localhost:3000/doctor/signup",{
                                    method:'POST',
                                    body:JSON.stringify({
                                        name, email,phone ,password, dob, gender,qualification,major,account, date 
                                    }),
                                    headers:{
                                        "Content-type":"application/json"
                                    }
                                }).then((res)=>{
                                    return res.json()
                                }).then(data=>{
                                    localStorage.setItem("token",data.token)
                                    console.log(data)
                                    window.location = "/docDashboard";
                                })
                        }}

                    >Sign up</Button>
                
            
            </Card>
            </div>

        </div>
    )

};

export default DoctorSignup