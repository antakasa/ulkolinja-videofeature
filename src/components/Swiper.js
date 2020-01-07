import React, {useState, useEffect} from 'react';
import {useWindowSize, playAndPause} from '../helpers/index.js';
import {Arrows, LoadingOverlay} from './index.js';
import Swiper from 'react-id-swiper';
import {
  determineBackgroundType,
  AnalyticsMethods as Analytics,
  determineContentType,
  lazyHelpers,
} from '../helpers/index.js';
const VideoSwiper = ({data, index, updateCurrentIndex, storeNextSlideFunc}) => {
  const [swiper, updateSwiper] = useState(null);
  const [initialized, initDone] = useState(false);
  const [coverImageLoaded, triggerCoverLoaded] = useState(false);
  const [width, height] = useWindowSize();

  const params = {
    getSwiper: updateSwiper,
    init: false,
    lazy: {
      loadPrevNext: true,
      loadPrevNextAmount: 2,
    },
    preloadImages: false,
    effect: 'none',
    keyboard: {
      enabled: true,
      onlyInViewport: false,
    },
    speed: 0,
    noSwiping: true,
    on: {
      slideChangeTransitionStart: () => {
        playAndPause();
      },
    },
  };

  useEffect(() => {
    if (swiper !== null) {
      //window.swiper = swiper;
      swiper.on('init', () => {
        lazyHelpers.initialize();
        lazyHelpers.loadNextPic();
        lazyHelpers.loadNextPic();
        lazyHelpers.loadNextPic();
        lazyHelpers.loadNextVideo(); // eka video
        initDone(true);
        Analytics.registerEvent(`cover`);
        storeNextSlideFunc(() => () => goNext());
      });
      swiper.init();
      swiper.on('slideChange', () => {
        lazyHelpers.loadNextVideo(); // eka video
        lazyHelpers.loadNextPic();
        updateCurrentIndex(swiper.realIndex);
        Analytics.registerEvent(`slide${swiper.realIndex}`);
      });
    }
  }, [swiper]);

  const goNext = () => {
    if (swiper !== null) {
      swiper.slideNext();
    }
  };

  const goPrev = () => {
    if (swiper !== null) {
      swiper.slidePrev();
    }
  };

  return (
    <>
      <LoadingOverlay isVisible={coverImageLoaded && initialized} />
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
            {determineBackgroundType(e, width >= 1025, triggerCoverLoaded)}
            {determineContentType(index, e, width >= 1025, swiper)}
            <Arrows type={e.type} desktop={width >= 1025} index={i} />
          </div>
        ))}
      </Swiper>
    </>
  );
};

export default VideoSwiper;
