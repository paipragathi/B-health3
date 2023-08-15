// import React from 'react'
// import Landing from './landing site/landing';
// import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
// import Dashboard from './patient/Dashboard';
// import Appointment2 from './doctor/Appointment2';
// import Appointment from './patient/Appointment';
// const App = () => {
//   return (
//     <div>
      
//     <Router>
//       <Routes>
//             <Route path="/patient" element={<Dashboard/>} /> 
//             <Route path="/" element={<Landing/>} />
//             <Route path="/appointment" element={<Appointment/>} /> 
//             <Route path="/document" element={<Appointment2/>} /> 

//       </Routes>
//     </Router>
    


//     </div>
    
//   )
// }

// export default App;


import React, { useEffect, useState } from 'react'
import Landing from './landing site/landing';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Dashboard from './patient/Dashboard';
import Appointment from './patient/Appointment';
import PatientLogin from './patient/PatientLogin';
import PatientSignup from './patient/PatientSignup';
import Appointment2 from './doctor/Appointment2';

const App = () => {

  const [account ,setAccount] = useState("");
  const [ehrContract , setEhrContract] = useState(null);
  const [rewardContract , setRewardContract] = useState(null);
  const [provider , setProvider] = useState(null);

  useEffect(()=>{
    
  }, [])

  return (
    <div>
      
    <Router>
      <Routes>
            <Route path="/patient" element={<Dashboard/>} /> 
            <Route path="/" element={<Landing/>} />
            <Route path="/appointment" element={<Appointment/>} /> 
            <Route path='/patient/login' element={<PatientLogin/>} />
            <Route path='/patient/signup' element={<PatientSignup/> } />
          
            <Route path="/document" element={<Appointment2/>} /> 

      </Routes>
    </Router>
    


    </div>
    
  )
}

export default App;