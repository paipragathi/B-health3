import React from 'react'
import Landing from './landing site/landing';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Dashboard from './patient/Dashboard';
import Appointment from './Appointment';
const App = () => {
  return (
    <div>
      
    <Router>
      <Routes>
            <Route path="/patient" element={<Dashboard/>} /> 
            <Route path="/" element={<Landing/>} />
            <Route path="/appointment" element={<Appointment/>} /> 

      </Routes>
    </Router>
    


    </div>
    
  )
}

export default App;