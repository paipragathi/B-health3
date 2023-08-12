// import React, { useState } from 'react';
// import './ImageSlider.css';

// const ImageSlider = ({ images }) => {
//   const [currentIndex, setCurrentIndex] = useState(0);

//   const handleNextClick = () => {
//     setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
//   };

//   const handlePreviousClick = () => {
//     setCurrentIndex((prevIndex) => (prevIndex - 1 + images.length) % images.length);
//   };

//   return (
//     <>
//     <div className="image-slider">
//       <img src={images[currentIndex]} alt={`Image ${currentIndex + 1}`} className="slider-image" />
//       <div className="slider-buttons">
//         <button onClick={handlePreviousClick}>&lt;
//       </button><button onClick={handleNextClick}>&gt;</button>
//       </div>  
//       <div className='right-top'>
//       <div className="logos"><span className='text-logo'>B-health</span></div>
//       <div className="taglines"><h1><i>Specialized</i> <span className='health'> Healthcare</span> <i>like no other</i></h1></div>
//       </div>
//     </div>
    
//      </>
//   );
// };

// export default ImageSlider;
import { useState } from "react";

const slideStyles = {
  width: "100%",
  height: "100%",
  borderRadius: "10px",
  backgroundSize: "cover",
  backgroundPosition: "center",
  backgroundColor: "black",
};

const rightArrowStyles = {
  position: "absolute",
  top: "50%",
  transform: "translate(0, -50%)",
  right: "32px",
  fontSize: "45px",
  color: "#fff",
  zIndex: 1,
  cursor: "pointer",
};

const leftArrowStyles = {
  position: "absolute",
  top: "50%",
  transform: "translate(0, -50%)",
  left: "32px",
  fontSize: "45px",
  color: "#fff",
  zIndex: 1,
  cursor: "pointer",
};

const sliderStyles = {
  position: "relative",
  height: "100%",
};

const dotsContainerStyles = {
  display: "flex",
  justifyContent: "center",
};

const dotStyle = {
  margin: "0 3px",
  cursor: "pointer",
  fontSize: "20px",
};

const ImageSlider = ({ slides }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const goToPrevious = () => {
    const isFirstSlide = currentIndex === 0;
    const newIndex = isFirstSlide ? slides.length - 1 : currentIndex - 1;
    setCurrentIndex(newIndex);
  };
  const goToNext = () => {
    const isLastSlide = currentIndex === slides.length - 1;
    const newIndex = isLastSlide ? 0 : currentIndex + 1;
    setCurrentIndex(newIndex);
  };
  const goToSlide = (slideIndex) => {
    setCurrentIndex(slideIndex);
  };
  const slideStylesWidthBackground = {
    ...slideStyles,
    backgroundImage: `url(${slides[currentIndex].url})`,
  };

  return (
    <div style={sliderStyles}>
      <div>
        <div onClick={goToPrevious} style={leftArrowStyles}>
          ❰
        </div>
        <div onClick={goToNext} style={rightArrowStyles}>
          ❱
        </div>
      </div>
      <div style={slideStylesWidthBackground}></div>
      <div style={dotsContainerStyles}>
        {slides.map((slide, slideIndex) => (
          <div
            style={dotStyle}
            key={slideIndex}
            onClick={() => goToSlide(slideIndex)}
          >
            ●
          </div>
        ))}
      </div>
    </div>
  );
};

export default ImageSlider;