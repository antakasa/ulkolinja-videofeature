import React from 'react';
import './arrows.css';
import nuoli from '../images/nuoli.png';
import petrooliNuoli from '../images/nuoli_petrooli.png';
import palloNuoli from '../images/nuoli_pallero.png';
import {data} from '../data';
const Arrows = ({type, desktop, index}) => {
  if (type === 'cover' && !desktop) {
    return <img src={nuoli} className="venezuela-arrow right mobile bounce" />;
  } else if (type === 'cover' && desktop) {
    return (
      <img src={palloNuoli} className="venezuela-arrow right desktop cover" />
    );
  } else if (type !== 'cover' && index !== data.length - 1 && desktop) {
    return (
      <>
        <img src={nuoli} className="venezuela-arrow right desktop" />
        <img src={nuoli} className="venezuela-arrow left desktop" />
      </>
    );
  } else if (index === data.length - 1 && desktop) {
    return <img src={nuoli} className="venezuela-arrow left desktop" />;
  } else {
    return null;
  }
};

export default Arrows;
