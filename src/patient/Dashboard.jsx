import React from 'react'
import SideNav from '../elements/Navbar'
import ImageSlider from '../elements/imageSlider'
import slider1 from "../assets/slider_1.jpg"
import slider2 from "../assets/slider_2.jpg"
import slider3 from "../assets/slider_3.jpg"
import Card from '../elements/card'

const Dashboard = () => {

    const images = [
        slider1, slider2, slider3, 
      ];
    
  return (

<>

    <div>
      <ImageSlider images={images}/>  
     <SideNav/> 
    </div>
    <div>
<Card/>
    </div>
    </>
  )
}

export default Dashboard;