import React, {useState, useEffect} from 'react';
import {playAndPause} from '../helpers/index.js';
import {Slide, LoadingOverlay} from './index.js';
import {AnalyticsMethods as Analytics, lazyHelpers} from '../helpers/index.js';
import Swiper from 'react-id-swiper';
const SetupSwiper = ({data, index, updateCurrentIndex, storeNextSlideFunc}) => {
  const [swiper, updateSwiper] = useState(null);
  const [initialized, initDone] = useState(false);
  const [coverImageLoaded, triggerCoverLoaded] = useState(false);

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
            <Slide
              e={e}
              prevClickAvailable={initialized && index !== 0}
              nextClickAvailable={initialized && index !== data.length - 1}
              goNext={goNext}
              index={index}
              goPrev={goPrev}
              triggerCoverLoaded={triggerCoverLoaded}
              swiper={swiper}
            />
          </div>
        ))}
      </Swiper>
    </>
  );
};

export default SetupSwiper;
