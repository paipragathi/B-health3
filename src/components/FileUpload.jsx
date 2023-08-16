import { useState } from "react";
import axios from "axios";
import "./FileUpload.css";
import { TextField } from "@mui/material";

function FileUpload({ ehrContract, provider, account }) {
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


  // const [urlArr, setUrlArr] = useState([]);
  const [file, setFile] = useState(null);
  const [fileName, setFileName] = useState("No image selected");
  const [description  ,setDescription] = useState("Description");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (file) {
        try {
          const formData = new FormData();
          formData.append("file", file);

          const resFile = await axios({
            method: "post",
            url: "https://api.pinata.cloud/pinning/pinFileToIPFS",
            data: formData,
            headers: {
              pinata_api_key: `95f328a012f1634eab8b`,
              pinata_secret_api_key: `8ea64e6b39c91631c66128a7c0e0dde35a6fbdf797a8393cc5ba8bf8d58e9b54`,
              "Content-Type": "multipart/form-data",
            },
          });

          const ImgHash = `ipfs://${resFile.data.IpfsHash}`;
          const signer = ehrContract.connect(provider.getSigner());
          signer.add(account, ImgHash);

          //setUrlArr((prev) => [...prev, ImgHash]);

          //Take a look at your Pinata Pinned section, you will see a new file added to you list.
        } catch (error) {
          alert("Error sending File to IPFS");
          console.log(error);
        }
      }

      alert("Successfully Uploaded");
      setFileName("No image selected");
      setFile(null); //to again disable the upload button after upload
    } catch (error) {
      console.log(error.message); //this mostly occurse when net is not working
    }
  };
  const retrieveFile = (e) => {
    const data = e.target.files[0];
    console.log(data);

    const reader = new window.FileReader();

    reader.readAsArrayBuffer(data);
    reader.onloadend = () => {
      setFile(e.target.files[0]);
    };
    setFileName(e.target.files[0].name);
    e.preventDefault();
  };
  return (
    <div className="top">
      <form className="form" onSubmit={handleSubmit}>
        <label htmlFor="file-upload" className="choose">
          {/*turn around for avoding choose file */}
          Choose Image
        </label>
        <input
          disabled={!account} //disabling button when metamask account is not connected
          type="file"
          id="file-upload"
          name="data"
          onChange={retrieveFile}
        />
        <span className="textArea">Image: {fileName}</span>
        {/* choose file */}
        <TextField 
            onChange={(e)=>{
                setDescription(e.target.value);
            }}
            fullWidth={true} 
            label="Description" 
            variant="outlined" 
            height = "100px"
        />
        <button type="submit" disabled={!file} className="upload">
          Upload file
        </button>
      </form>
    </div>
  );
}

export default FileUpload;