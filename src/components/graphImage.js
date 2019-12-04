import React from 'react';
import './graphImage.css';
const GraphImage = ({src}) => {
  return (
    <>
      <img className="swiper-lazy graph-image" data-src={src} />
    </>
  );
};

export default GraphImage;
