import React from "react";
import "./landing.css";
// import SideNav from "../elements/Navbar"
import ImageSlider from "../elements/imageSlider";
const Landing = () => {

  
  const images = [
    slider1, slider2, slider3, 
  ];
  return (
    <div >
     <ImageSlider images={images}/>

    </div>
  );
}
export default Landing;
