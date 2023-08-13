import React from 'react'
import Landing from './landing site/landing';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Dashboard from './patient/Dashboard';
import Appointment2 from './doctor/Appointment2';
import Appointment from './patient/Appointment';
const App = () => {
  return (
    <div>
      
    <Router>
      <Routes>
            <Route path="/patient" element={<Dashboard/>} /> 
            <Route path="/" element={<Landing/>} />
            <Route path="/appointment" element={<Appointment/>} /> 
            <Route path="/document" element={<Appointment2/>} /> 

      </Routes>
    </Router>
    


    </div>
    
  )
}

export default App;