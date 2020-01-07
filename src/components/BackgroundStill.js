import React from 'react';
const BackgroundStill = ({src, coverLoadedCallback, cover, desktopSrc}) => {
  return (
    <div className={`swiper-video ${desktopSrc ? 'fullscreen' : ''} `}>
      <img
        className="lazy-this swiper-video-player anchor-middle-center"
        onLoad={
          typeof coverLoadedCallback === 'function'
            ? () => coverLoadedCallback(true)
            : null
        }
        data-src={desktopSrc ? desktopSrc : src}
      />
    </div>
  );
};

export default BackgroundStill;
