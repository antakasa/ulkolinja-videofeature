import React from 'react';
import {useWindowSize, playAndPause} from '../helpers/index.js';
import {Arrows} from './index.js';
import {
  determineBackgroundType,
  determineContentType,
} from '../helpers/index.js';
import {useCMS, useLocalForm, useWatchFormValues} from 'tinacms';
import Swiper from 'react-id-swiper';

const SlideContainer = ({
  data,
  triggerCoverLoaded,
  goPrev,
  index,
  goNext,
  swiper,
  params,
  initialized,
}) => {
  const [width, height] = useWindowSize();
  const isDesktop = width >= 1025;
  return (
    <Swiper {...params}>
      {data.map((e, i) => (
        <div key={i}>
          {initialized && (
            <>
              {index !== 0 && <div onClick={goPrev} id="prev-catch" />}
              {index !== data.length - 1 && (
                <div onClick={goNext} id="next-catch" />
              )}
            </>
          )}
          {determineBackgroundType(e, isDesktop, triggerCoverLoaded)}
          {determineContentType(index, e, isDesktop, swiper)}
          <Arrows type={e.type} desktop={isDesktop} index={i} />
        </div>
      ))}
    </Swiper>
  );
};

export default SlideContainer;
