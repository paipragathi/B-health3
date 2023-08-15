import React from 'react'
// import SideNav from '../elements/Navbar'
import PatientLogin from './PatientLogin'
import s1 from "../assets/slider_1.jpg"
import s2 from "../assets/slider_2.jpg"
 import ResponsiveAppBar from '../elements/Navbar-2'
import s3 from '../assets/slider_3.jpg'
import SideNav from '../elements/Navbar'
import EHR from "../artifacts/contracts/EHR.sol/EHR.json";
import Reward from '../artifacts/contracts/Reward.sol/Reward.json';
import { ethers } from 'ethers'
import { useState } from 'react'
import { useEffect } from 'react'
import { SetMeal } from '@mui/icons-material'


const Dashboard = () => {

  const [account,setAccount] = useState("");
  const [ehrContract ,setEhrContract] = useState(null);
  const [rewardContract ,setRewardContract] = useState(null);
  const [provider ,setProvider] = useState(null);
  const [email ,setEmail] = useState("");

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

  const slides = [
    { url: s1},
    { url: s2 },
    {url: s3 },
  ];
  const containerStyles = {
    width: "1000px",
    height: "530px",
    margin: "0 0",
    
  };
    
  return (
    <> 
    <h1>helloxfhf</h1>
    <ResponsiveAppBar/> 
      <div className="c" style={containerStyles}>
        <SideNav slides={slides} />
      </div> 
    </>
  
  )


};

export default Dashboard;