// SPDX-License-Identifier: GPL-3.0

pragma solidity >=0.7.0 <0.9.0;
contract MedicalRecord{

    struct Access{
        address user;
        bool access;
    }

    struct Patients{
        string uhid;
        string name;
        string phone;
        string email;
        string gender;
        string dob;
        string height;
        string weight;
        string houseaddr;
        string bloodgroup;
        string allergies;
        string medication;
        string emergencyName;
        string emergencyContact;
        address addr;
        uint date;
    }

    struct Doctors{
        string uhid;
        string name;
        string phone;
        string gender;
        string dob;
        string qualification;
        string major;
        uint256 rating;
        address addr;
        uint256 date;
    }

    struct Appointments{
        string appointmentId;
        address doctoraddr;
        string docName;
        address patientaddr;
        string patientName;
        string date;
        string time;
        string symptoms;
        string department;
        string referingDoctor; // if any doctor referred for this
        string emergencyStatus; // for color coding
        string status; // if the appointment is completed
        uint creationDate;

    }

    struct Documents{
        uint256 documentId;
        string documentType;
        string documenthash;
        uint256 timestamp;
    }

    struct Prescription{
        uint256 prescreptionID;
        string patientName;
        address patientAddress;
        string docName;
        address docAddress;
        string patientUhid;
        string description;
        string medicineDosage;
        string prescribingDoctorName;
        uint256 timestamp;
    }

    
    address public owner = 0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266 ; //address of B-Health which has deployed the smart contract
    address[] public patientList;
    address[] public doctorList;
    Appointments[] public appointmentList;

    mapping(address => Access[])accessList;

    mapping(address => Documents[]) docs; //to get all the documents with patient's address
    mapping(address => Prescription[])presc; // to get all patient prescriptions from address

    mapping(address => Patients) patients;
    mapping(address => Doctors) doctors;
    mapping(address => Appointments) appointments;    

    mapping(address => mapping(address => bool)) ownership;
    mapping(address => mapping(address => bool)) previousData;
    mapping(address => bool) isPatient;
    mapping(address => bool) isDoctor;
    mapping(address => uint256) appointmentPerPatient;
    mapping(address => uint256) documentCountPerAddress;

    uint256 public patientCount = 0;
    uint256 public doctorCount = 0;
    uint256 public appointmentCount = 0;
    uint256 public permissionGrantedCount = 0;
    uint256 public prescriptionCount =0;
    

    constructor(){
        owner = msg.sender;
    }

    // retreive patient details from the signup page and store the data into the blockchain


    function setPatientDetails(
        string memory _uhid,
        string memory _name,
        string memory _phone,
        string memory _email,
        string memory _gender,
        string memory _dob,
        string memory _height,
        string memory _weight,
        string memory _houseaddr,
        string memory _bloodgroup,
        string memory _allergies,
        string memory _medication,
        string memory _emergencyName,
        string memory _emergencyContact
    ) internal {
        require(!isPatient[msg.sender],"Patient already exists.");
        Patients memory patient = patients[msg.sender];

        patient.uhid = _uhid;
        patient.name = _name;
        patient.phone = _phone;
        patient.gender = _gender;
        patient.dob = _dob;
        patient.height = _height;
        patient.weight = _weight;
        patient.houseaddr = _houseaddr;
        patient.bloodgroup = _bloodgroup;
        patient.allergies = _allergies;
        patient.email = _email;
        patient.medication  = _medication;
        patient.emergencyName = _emergencyName;
        patient.emergencyContact = _emergencyContact;
        patient.addr = msg.sender;
        patient.date= block.timestamp;

        patientList.push(msg.sender);
        isPatient[msg.sender] = true;
        patientCount++;
    }
    
   //allow patients to edit theit existing records
    function editPatientDetails(
        string memory _name, string memory _phone, string memory _gender, string memory _dob, string memory _height, string memory _weight, string memory _houseaddr, string memory _bloodgroup, string memory _allergies, string memory _medication, string memory _emergencyName, string memory _emergencyContact
    ) public{
        require(isPatient[msg.sender], "Only patient can edit this detail");

        Patients memory patient = patients[msg.sender];

        patient.name = _name;
        patient.phone = _phone;
        patient.gender =_gender;
        patient.dob = _dob; 
        patient.height = _height;
        patient.weight = _weight;
        patient.houseaddr = _houseaddr;
        patient.bloodgroup = _bloodgroup;
        patient.allergies = _allergies;
        patient.medication = _medication;
        patient.emergencyName = _emergencyName;
        patient.emergencyContact = _emergencyContact;
        patient.addr = msg.sender;
        
    }

    function getPatientDetails(address _patientAddress) public view returns(Patients memory){
        return patients[_patientAddress];
    }

    function getAllPatientDetails() public view returns(Patients[] memory){
        uint256 itemCount = patientCount;
        uint256 currentIndex=0;

        Patients[] memory items = new Patients[](itemCount);
        for(uint256 i=0 ; i<itemCount ; i++){   
            address patientAddress = patientList[i];
            Patients memory currentPatient = patients[patientAddress];
            items[currentIndex++] = currentPatient;
        }
        return items;
    }

    //retrieve doctor details from signup page and save to blockchain
    function setDoctorDetails(
        string memory _uhid, string memory _name, string memory _phone, string memory _gender, string memory _dob, string memory _qualification, string memory _major
    ) public {
        require(!isDoctor[msg.sender], "Doctor already exists.");

        Doctors memory doctor = doctors[msg.sender];

        doctor.uhid = _uhid;
        doctor.name = _name;
        doctor.phone = _phone;
        doctor.gender =_gender;
        doctor.dob = _dob;
        doctor.qualification = _qualification;
        doctor.major = _major;
        doctor.addr = msg.sender;
        doctor.date = block.timestamp;

        doctorList.push(msg.sender);
        isDoctor[msg.sender]=true;
        doctorCount++;

    }

    // allow doctor to edit profile
    function editDoctorDetails(
        string memory _uhid, string memory _name, string memory _phone, string memory _gender, string memory _dob, string memory _qualification, string memory _major
    ) public{
        require(isDoctor[msg.sender], "Only Doctor can make changes.");
        Doctors memory doctor = doctors[msg.sender];

        doctor.uhid = _uhid;
        doctor.name = _name;
        doctor.phone = _phone;
        doctor.gender = _gender;
        doctor.dob = _dob;
        doctor.qualification = _qualification;
        doctor.major = _major;
        doctor.addr = msg.sender;

    }

    function getDoctorDetails(address _doctorAddress) public view returns(Doctors memory){
        return doctors[_doctorAddress];
    }

    function getAllDoctorDetails() public view returns(Doctors[] memory){
        uint256 itemCount = doctorCount;
        uint256 currentIndex=0;

        Doctors[] memory items = new Doctors[](itemCount);
        for(uint256 i=0 ; i<itemCount ; i++){   
            address doctorAddress = doctorList[i];
            Doctors memory currentDoc = doctors[doctorAddress];
            items[currentIndex++] = currentDoc;
        }
        return items;
    }

    
    // retrieve the details from appointments page and store into blockchain
    function setAppointment(string memory _patientName,address _docAddress, string memory _docName, string memory _date, string memory _time,string memory _symptoms, string memory _status,string memory _id)public{
        require(isPatient[msg.sender], "Only the patient can make appointments");
        Appointments memory app = appointments[msg.sender];

        app.appointmentId = _id;
        app.doctoraddr = _docAddress;
        app.docName = _docName;
        app.patientaddr = msg.sender;
        app.patientName = _patientName;
        app.date = _date;
        app.time = _time;
        app.symptoms = _symptoms;
        app.status = _status;
        app.creationDate = block.timestamp;

        appointmentList.push(app);
        appointmentCount++;
        appointmentPerPatient[msg.sender]++;
    }

    //Retrieve appointment details from appointment page and store the details into the blockchain
    function updateAppointments(address _docAddress,string memory _referingDoctor ,string memory _department,string memory _symptoms, string memory _docName, string memory _date, string memory _time,string memory _status) public{
        require(isPatient[msg.sender], "Only patient can update appointments");
        Appointments memory app = appointments[msg.sender];

        app.doctoraddr = _docAddress;
        app.symptoms = _symptoms;
        app.department = _department;
        app.docName = _docName;
        app.referingDoctor = _referingDoctor;
        app.date = _date;
        app.time = _time;
        app.symptoms = _symptoms;
        app.status = _status;
        app.creationDate = block.timestamp;
        
    }

    function getPatientAppointment(address _patientAddress) public view returns(Appointments memory){
        return appointments[_patientAddress];
    }

    // getting all the appointments from centralised database 

    // uploading the documents by patient 
    function uploadDocument(string memory _documentType, string memory _documentUrl) public  returns(string memory){
        require(isPatient[msg.sender], "Only patient can upload their documents");
        uint256 documentId = docs[msg.sender].length +1000;
        uint256 timestamp = block.timestamp;
        Documents memory newDocs = Documents(documentId, _documentType , _documentUrl, timestamp);
        docs[msg.sender].push(newDocs);
        documentCountPerAddress[msg.sender] +=1;
        return _documentUrl ;
    }

    // allow the patient to get documents
    function getDocumentsForPatient(address _address) public view returns(Documents[] memory){
        
        require(isPatient[_address], "Only the authorized patient can access these documents");
        return docs[_address];

    }

    //function to five permission
    function allow(address _address) public {
        ownership[msg.sender][_address] = true;
        if(previousData[msg.sender][_address]){
            for(uint i=0 ; i<accessList[msg.sender].length ; i++){
                if(accessList[msg.sender][i].user == _address){
                    accessList[msg.sender][i].access = true;
                }
            }
        }else{
            accessList[msg.sender].push(Access(_address,true));
            previousData[msg.sender][_address] = true;
        }
        permissionGrantedCount++;
    }

    //function to revoke access
    function disAllow(address user) public{
        ownership[msg.sender][user] = false;
        for(uint i=0 ; i<accessList[msg.sender].length ; i++){
            if(accessList[msg.sender][i].user == user){
                accessList[msg.sender][i].access = false;
            }
        }
    }

    //doctors can access patients documents using their address

    function displayDocs(address _user) external view returns(Documents[] memory){
        require(_user == msg.sender || ownership[_user][msg.sender],"You don't have access." );
        return docs[_user];
    } 

    //patient can see doctors accessing their documents
    function sharedAccess() public view returns(Access[] memory){
        return accessList[msg.sender];
    }

    


    //function to create a prescription and send access to patient
    function issuePrescription(address _patientAddress ,string memory _patientName, string memory _docName ,string memory _description , string memory _medicineDosage, string memory _uhid , string memory _prescribingDoctor ) public {
        require(isDoctor[msg.sender], "Only doctor can issue prescription.");
        uint256 presId = presc[msg.sender].length+1000;
        Prescription memory prescription = Prescription(presId, _patientName, _patientAddress , _docName, msg.sender , _uhid, _description, _medicineDosage ,_prescribingDoctor, block.timestamp);

        presc[msg.sender].push(prescription);
        prescriptionCount++;
        allow(_patientAddress);
    }
    //patients can access doctors issued prescription
    function displayPrescription(address _user) external view returns(Prescription[] memory){
        require(_user == msg.sender || ownership[_user][msg.sender],"You don't have access." );
        return presc[_user];
    } 
    

    
}