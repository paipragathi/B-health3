// import React, { useState } from "react";
// import "./SideNav.css";
// import HomeIcon from '@mui/icons-material/Home';
// import PersonIcon from '@mui/icons-material/Person';
// import EditNoteIcon from '@mui/icons-material/EditNote';
// import MedicationIcon from '@mui/icons-material/Medication';
// import FileOpenIcon from '@mui/icons-material/FileOpen';
// import EmojiEventsIcon from '@mui/icons-material/EmojiEvents';
// import user from "../assets/user.png";


// const slideStyles = {
//   width: "103%",
//   height: "100%",
//   borderRadius: "5px",
//   position: "absolute",
//   left:"300px",
//   backgroundSize: "cover",
//   backgroundPosition: "center",
//   backgroundColor: "blue",

// };

// const rightArrowStyles = {
//   position: "absolute",
//   top: "50%",
//   transform: "translate(0, -50%)",
//   right: "-270px",
//   fontSize: "45px",
//   color: "#fff",
//   zIndex: 1,
//   cursor: "pointer",
// };

// const leftArrowStyles = {
//   position: "absolute",
//   top: "50%",
//   transform: "translate(0, -50%)",
//   left: "315px",
//   fontSize: "45px",
//   color: "#fff",
//   zIndex: 1,
//   cursor: "pointer",
// };

// const sliderStyles = {
//   position: "relative",
//   height: "100%",
// };

// const dotsContainerStyles = {
//   display: "flex",
//   justifyContent: "center",
// };

// const dotStyle = {
//   margin: "0 3px",
//   cursor: "pointer",
//   fontSize: "20px",
// };
// const SideNav = ({slides}) => {
//   const [activeItem, setActiveItem] = useState("dashboard");
  
//   const handleItemClick = (item) => {
//     setActiveItem(item);
//   };
 
//     const [currentIndex, setCurrentIndex] = useState(0);
//     const goToPrevious = () => {
//       const isFirstSlide = currentIndex === 0;
//       const newIndex = isFirstSlide ? slides.length - 1 : currentIndex - 1;
//       setCurrentIndex(newIndex);
//     };
//     const goToNext = () => {
//       const isLastSlide = currentIndex === slides.length - 1;
//       const newIndex = isLastSlide ? 0 : currentIndex + 1;
//       setCurrentIndex(newIndex);
//     };
//     const goToSlide = (slideIndex) => {
//       setCurrentIndex(slideIndex);
//     };
//     const slideStylesWidthBackground = {
//       ...slideStyles,
//       backgroundImage: `url(${slides[currentIndex].url})`,
//     };
//   return (
//     <>
   
     
//       <nav className="side-nav">

//         <ul className="nav-menu">
//           <li>
//             <img src={user} style={{height: "180px", width:"220px", margin:"0"}} alt="" />
//           </li>
//           <li
//             className={`nav-item ${activeItem === "dashboard" ? "active" : ""}`}
//             onClick={() =>  handleItemClick("dashboard")
//             }
//           >
//             <a href="patient">
//               <i className="fas fa-tachometer-alt"></i>
//               <span className="menu-text">
//              <span><HomeIcon/></span> 
//               DASHBOARD </span>

//             </a>
//           </li>
//           <li
//             className={`nav-item ${activeItem === "users" ? "active" : ""}`}
//             onClick={() => handleItemClick("users")}
//           >
//             <a href="#">
//               <i className="fas fa-user"></i>
//               <span className="menu-text">
//                 <PersonIcon/>
//                 YOUR PROFILE</span>
//             </a>
//           </li>
//           <li
//             className={`nav-item ${activeItem === "posts" ? "active" : ""}`}
//             onClick={() => handleItemClick("posts")}
//           >
//             <a href="/Appointment">
//               <i className="fas fa-file-alt"></i>
//               <span className="menu-text">
//                 <EditNoteIcon/> APPOINTMENTS</span>
//             </a>
//           </li>
//           <li
//             className={`nav-item ${activeItem === "media" ? "active" : ""}`}
//             onClick={() => handleItemClick("media")}
//           >
//             <a href="#">
//               <i className="fas fa-play"></i>
//               <span className="menu-text"> <MedicationIcon/>TREATMENTS</span>
//             </a>
//           </li>
//           <li
//             className={`nav-item ${activeItem === "exit" ? "active" : ""}`}
//             onClick={() => {
//               handleItemClick("exit")
//             console.log("dvd");
//             }}
//           >
//             <a href="#">
//               <i className="fas fa-sign-out-alt"></i>
//               <span className="menu-text"><FileOpenIcon/>DOCUMENTS</span>
//             </a>
//           </li>
//           <li
//             className={`nav-item ${activeItem === "exit" ? "active" : ""}`}
//             onClick={() => handleItemClick("exit")}
//           >
//             <a href="#">
//               <i className="fas fa-sign-out-alt"></i>
//               <span className="menu-text"><EmojiEventsIcon/>REWARDS</span>
//             </a>
//            </li>
//         </ul>
//       </nav>
    
//     <div className="slide" style={sliderStyles}>
//     <div>
//       <div onClick={goToPrevious} style={leftArrowStyles}>
//         ❰
//       </div>
//       <div onClick={goToNext} style={rightArrowStyles}>
//         ❱
//       </div>
//     </div>
//     <div style={slideStylesWidthBackground}></div>
//     <div style={dotsContainerStyles}>
//       {slides.map((slide, slideIndex) => (
//         <div
//           style={dotStyle}
//           key={slideIndex}
//           onClick={() => goToSlide(slideIndex)}
//         >
//           ●
//         </div>
//       ))}
//     </div>
//   </div>
//  </>
//   );
// };

// export default SideNav;





import React, { useState } from "react";
import "./SideNav.css";
import HomeIcon from '@mui/icons-material/Home';
import PersonIcon from '@mui/icons-material/Person';
import EditNoteIcon from '@mui/icons-material/EditNote';
import MedicationIcon from '@mui/icons-material/Medication';
import FileOpenIcon from '@mui/icons-material/FileOpen';
import EmojiEventsIcon from '@mui/icons-material/EmojiEvents';
import {useNavigate} from 'react-router-dom';
// import Appointment from "../components/appointment";

const SideNav = () => {
  const [activeItem, setActiveItem] = useState("dashboard");
  const navigate = useNavigate();

  const handleItemClick = (item) => {
    setActiveItem(item);
  };

  return (
    <div className="container">
     
      <nav className="side-nav">
        <ul className="nav-menu">
          <li
            className={`nav-item ${activeItem === "dashboard" ? "active" : ""}`}
            onClick={()=>{
              navigate("/");
            }}
          >
            <a href="patient">
              <i className="fas fa-tachometer-alt"></i>
              <span className="menu-text">
             <span><HomeIcon/></span> 
              Dashboard </span>

            </a>
          </li>
          <li
            className={`nav-item ${activeItem === "users" ? "active" : ""}`}
            onClick={()=>{
              navigate("/");
            }}
          >
            <a href="#">
              <i className="fas fa-user"></i>
              <span className="menu-text">
                <PersonIcon/>
                Your Profile</span>
            </a>
          </li>
          <li
            className={`nav-item ${activeItem === "posts" ? "active" : ""}`}
            onClick={()=>{
              navigate("/Appointment");
            }}
          >
            <a href="#">
              <i className="fas fa-file-alt"></i>
              <span className="menu-text">
                <EditNoteIcon/> Appointments</span>
            </a>
          </li>
          <li
            className={`nav-item ${activeItem === "media" ? "active" : ""}`}
            onClick={()=>{
              navigate("/");
            }}
          >
            <a href="#">
              <i className="fas fa-play"></i>
              <span className="menu-text"> <MedicationIcon/>Treatments</span>
            </a>
          </li>
          <li
            className={`nav-item ${activeItem === "exit" ? "active" : ""}`}
            onClick={()=>{
              handleItemClick("exit");
              navigate("/document");
            }}
          >
            <a href="#">
              <i className="fas fa-sign-out-alt"></i>
              <span className="menu-text"><FileOpenIcon/>Documents</span>
            </a>
          </li>
          <li
            className={`nav-item ${activeItem === "exit" ? "active" : ""}`}
            onClick={()=>{
              navigate("/");
            }}
          >
            <a href="#">
              <i className="fas fa-sign-out-alt"></i>
              <span className="menu-text"><EmojiEventsIcon/>Rewards</span>
            </a>
           </li>
        </ul>
      </nav>
    
    </div>
  );
};

export default SideNav;
