import React from 'react';
import {BackgroundStill, BackgroundVideo} from '../components/index.js';
const determineBackgroundType = (element, desktop, triggerCoverLoaded) => {
  const {type, src, sub, tg, desktopSrc, id} = element;

  if (type === 'still') {
    return <BackgroundStill coverLoadedCallback={false} src={src} />;
  } else if (type === 'cover') {
    return (
      <BackgroundStill
        coverLoadedCallback={triggerCoverLoaded}
        desktopSrc={desktop ? desktopSrc : null}
        cover
        src={src}
      />
    );
  } else if (type === 'background-video') {
    return <BackgroundVideo src={src} />;
  } else if (type === 'subtitled-video') {
    return (
      <BackgroundVideo src={src} id={id} sub={sub} tg={tg} desktop={desktop} />
    );
  } else {
    return null;
  }
};

export default determineBackgroundType;
