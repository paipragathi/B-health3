import React, { useState } from 'react';
import './ImageSlider.css';

const ImageSlider = ({ images }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const handleNextClick = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
  };

  const handlePreviousClick = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + images.length) % images.length);
  };

  return (
    <>
    <div className="image-slider">
      <img src={images[currentIndex]} alt={`Image ${currentIndex + 1}`} className="slider-image" />
      <div className="slider-buttons">
        <button onClick={handlePreviousClick}>&lt;
      </button><button onClick={handleNextClick}>&gt;</button>
      </div>  
      <div className='right-top'>
      <div className="logos"><span className='text-logo'>B-health</span></div>
      <div className="taglines"><h1><i>Specialized</i> <span className='health'> Healthcare</span> <i>like no other</i></h1></div>
      </div>
    </div>
    
     </>
  );
};

export default ImageSlider;
