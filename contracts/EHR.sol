// SPDX-License-Identifier: GPL-3.0

pragma solidity ^0.8.9;

contract EHR {
  
    struct Access{
        address user; 
        bool access; //true or false
    }

    struct Documents{
        string documentURL;
        string documenType;
        string description;
        uint256 uploadedAt;
    }

    struct Prescription{
        string patientName;
        address patientAddress;
        string docName;
        address docAddress;
        string description;
        // mapping(string => mapping(uint=>uint)) medicineDosage; // a mapping of medicineName ->amount -> how many a day
        string medicineDosage; // work on adding above functionality
        string prescribingDoctor;
        uint256 createdAt;
    }

    
    mapping(address => Documents[]) docs;
    mapping(address => Prescription[]) presc;
    mapping(address=>mapping(address=>bool)) ownership;
    mapping(address=>Access[]) accessList;
    mapping(address=>mapping(address=>bool)) previousData;



    function addDocument(string memory _url, string memory _type, string memory _description) external{
        Documents memory doc = Documents(_url, _type,_description , block.timestamp);
        docs[msg.sender].push(doc);
    }

    // function addMedicineDosage(
    //     string memory medicineName,
    //     uint256 amount,
    //     uint256 timesPerDay
    // ) external {
        
    //     // prescriptions[prescriptionIndex].medicineDosage[medicineName][amount] = timesPerDay;
    //     Prescription.
    // }

    function createPrescription(
        string memory _patientName,
        address _patientAddress,
        string memory _docName,
        address _docAddress,
        string memory _description,
        string memory _prescribingDoctor,
        string memory _medicineDosage
    ) external {
        Prescription memory prescription = Prescription({
            patientName:_patientName,
            patientAddress : _patientAddress,
            docName: _docName,
            docAddress : _docAddress,
            description : _description,
            medicineDosage : _medicineDosage,
            prescribingDoctor : _prescribingDoctor,
            createdAt : block.timestamp
        });

        presc[msg.sender].push(prescription);
    }

    function allow(address user) external {//def
        ownership[msg.sender][user]=true; 
        if(previousData[msg.sender][user]){
            for(uint i=0;i<accessList[msg.sender].length;i++){
                if(accessList[msg.sender][i].user==user){
                    accessList[msg.sender][i].access=true; 
                }
            }
        }else{
            accessList[msg.sender].push(Access(user,true));  
            previousData[msg.sender][user]=true;  
        }

    }
    function disallow(address user) public{
        ownership[msg.sender][user]=false;
        for(uint i=0;i<accessList[msg.sender].length;i++){
            if(accessList[msg.sender][i].user==user){ 
                accessList[msg.sender][i].access=false;  
            }
        }
    }


    function displayDocument(address _user) external view returns(Documents[] memory){
        require(_user == msg.sender || ownership[_user][msg.sender] , "You don't have access");
        return docs[msg.sender];
    }

    function displayPrescription(address _user) external view returns(Prescription[] memory){
        require(_user == msg.sender || ownership[_user][msg.sender] , "You don't have access");
        return presc[msg.sender];
    }

    function sharedAccess() public view returns(Access[] memory){
        return accessList[msg.sender];
    }
}