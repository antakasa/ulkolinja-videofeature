import React from 'react';
import BackgroundStill from '../components/backgroundStill';
import BackgroundVideo from '../components/backgroundVideo';
const determineBackgroundType = (
  triggerCoverLoaded,
  type,
  src,
  sub,
  tg,
  desktop,
  desktopSrc,
  id,
) => {
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
