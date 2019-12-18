import './index.css';
import React, {useEffect, useRef, useState} from 'react';
import ReactDOM from 'react-dom';
import Swiper from 'react-id-swiper';
import {Helmet} from 'react-helmet';
import Pagination from './components/pagination';
import ParagraphChapter from './components/paragraphChapter';
import ParagraphCover from './components/paragraphCover';
import FinalPage from './components/finalPage';
import Header from './components/header';
import {data} from './data';
import variTausta from './images/varitausta.jpg';
import GraphImage from './components/graphImage.js';
import LoadingOverlay from './components/loadingOverlay';
import Div100vh from 'react-div-100vh';
import {useWindowSize, secondsToTime, createSubtitleTrack} from './helpers';
import Arrows from './components/arrows';
import {AnalyticsMethods as Analytics} from './helpers';
import BrandLogo from './images/ulkolinja_logo.png';
import {ProgressBar} from './components/pagination';
import {useSwipeable, Swipeable} from 'react-swipeable';
import subtitleSvg from './images/conversation.svg';
const BackgroundVideo = ({src, sub, tg, desktop, id}) => {
  const trackEl = useRef(null);
  const videoEl = useRef(null);
  const [progress, updateProgress] = useState(0);
  const [time, updateTime] = useState({h: 0, m: 0, s: 0});
  const [currentSub, displaySub] = useState('');
  useEffect(() => {
    const track = createSubtitleTrack(videoEl, id, sub);
    if (!track) return;
    track.oncuechange = function(event) {
      const activeCues = track.activeCues;
      if (activeCues.length > 0) displaySub(activeCues[0].text);
      if (activeCues.length === 0) displaySub('');
    };
  }, []);

  return (
    <div className="swiper-video">
      {sub && (
        <div
          className={`venezuela-subtitle-container ${
            desktop ? 'desktop' : ''
          }`}>
          {tg && desktop && (
            <img
              src={tg}
              className={`subvideo-tg ${desktop ? 'desktop' : ''}`}
            />
          )}
          <div
            style={{
              display: !desktop && currentSub.length === 0 ? 'none' : 'initial',
            }}
            className={`venezuela-subtitle ${desktop ? 'desktop' : ''}`}>
            {currentSub.length > 0 && <q>{currentSub}</q>}
          </div>

          <div className="tg-and-progress">
            {tg && !desktop && (
              <img
                src={tg}
                className={`subvideo-tg ${desktop ? 'desktop' : ''}`}
              />
            )}
            <div className="time-left">
              {time.m}:{time.s}
            </div>
            <div className={`video-progress ${tg && !desktop ? 'half' : ''}`}>
              <ProgressBar percentage={progress} />
            </div>
          </div>
        </div>
      )}
      <video
        className="swiper-video-player anchor-middle-center"
        preload="metadata"
        crossOrigin="anonymous"
        playsInline
        autoPlay
        ref={videoEl}
        onTimeUpdate={e => {
          const {duration, currentTime} = videoEl.current;
          updateProgress((currentTime / duration) * 100);
          updateTime(secondsToTime(duration - currentTime || 0));
        }}
        muted
        loop
        data-src={src}>
        <source data-src={src} type="video/mp4" />
        {sub && false && (
          <track
            label="Finnish"
            kind="subtitles"
            ref={trackEl}
            crossOrigin="anonymous"
            srcLang="fi"
            data-src={sub}
            default
          />
        )}
      </video>
    </div>
  );
};
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

let listOfVideos = [];
let listOfPics = [];

const VideoSwiper = ({index, updateCurrentIndex, storeNextSlideFunc}) => {
  const [swiper, updateSwiper] = useState(null);
  const [initialized, initDone] = useState(false);
  const [coverImageLoaded, triggerCoverLoaded] = useState(false);
  const handlers = useSwipeable({
    onSwiped: () => alert('sdag'),
  });
  const [width, height] = useWindowSize();

  const eventHandler = () => alert('swipe');
  const playAndPause = () => {
    const active = document.querySelector('.swiper-slide-active') || {};
    const prev = document.querySelector('.swiper-slide-prev') || {};
    const next = document.querySelector('.swiper-slide-next') || {};
    if (next && typeof next.querySelector === 'function') {
      const nextVideo = next.querySelector('video');
      if (nextVideo) {
        next.querySelector('video').pause();
      }
    }
    if (typeof prev.querySelector === 'function') {
      const prevVideo = prev.querySelector('video');
      if (prevVideo) {
        prevVideo.pause();
        prevVideo.oncanplay = function() {
          prevVideo.pause();
        };
      }
    }

    if (typeof active.querySelector === 'function') {
      const activeVideo = active.querySelector('video');
      if (activeVideo) {
        const activeVideo = active.querySelector('video');
        if (parseInt(activeVideo.readyState) === 4) {
          activeVideo.play();
          activeVideo.muted = false;
        } else {
          activeVideo.oncanplay = function() {
            activeVideo.muted = false;
            activeVideo.play();
          };
        }
      }
    }
  };

  const params = {
    getSwiper: updateSwiper,
    init: false,
    lazy: {
      loadPrevNext: true,
      loadPrevNextAmount: 2,
    },
    preloadImages: false,
    effect: 'none',

    speed: 0,
    noSwiping: true,
    on: {
      slideChangeTransitionStart: () => {
        playAndPause();
      },
    },
  };

  const loadNextPic = () => {
    if (listOfPics.length < 1) return;
    const picSource = listOfPics[0];
    picSource.src = picSource.dataset.src;
    listOfPics = listOfPics.slice(1, listOfPics.length);
  };

  const loadNextVideo = () => {
    // This is used to lazy load videos & subitles one by one until all videos are loaded
    if (listOfVideos.length < 1) return;
    const video = listOfVideos[0];
    const videoSource = video.querySelector('source');
    const subTrack = video.querySelector('track');
    videoSource.src = video.dataset.src;
    if (subTrack) {
      subTrack.src = subTrack.dataset.src;
    }
    video.load();
    listOfVideos = listOfVideos.slice(1, listOfVideos.length);
  };

  useEffect(() => {
    if (swiper !== null) {
      //window.swiper = swiper;
      swiper.on('init', () => {
        listOfVideos = Array.from(document.querySelectorAll('video'));
        listOfPics = Array.from(document.querySelectorAll('.lazy-this'));
        loadNextPic(); //cover pic
        loadNextVideo(); // eka video
        loadNextPic(); // väritausta
        initDone(true);
        Analytics.registerEvent(`cover`);
        storeNextSlideFunc(() => () => goNext());
      });
      swiper.init();
      swiper.on('slideChange', () => {
        loadNextVideo();
        loadNextPic(); //loads one image more
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

  const determineBackgroundType = (
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
        <BackgroundVideo
          src={src}
          id={id}
          sub={sub}
          tg={tg}
          desktop={desktop}
        />
      );
    } else {
      return null;
    }
  };

  const determineContentType = (index, e, desktop) => {
    const {
      src,
      credits,
      text,
      time,
      type,
      bottom,
      areenaVideo,
      header1,
      subheader,
      id,
    } = e;
    if (type === 'graph') {
      return <GraphImage src={src} />;
    } else if (type === 'finalPage') {
      return <FinalPage swiper={swiper} index={index} areenaId={areenaVideo} />;
    } else if (type === 'cover') {
      return (
        <ParagraphCover
          index={index}
          desktop={desktop}
          header={header1}
          subHeader={subheader}
        />
      );
    } else {
      return (
        <ParagraphChapter
          index={index}
          text={text}
          time={time}
          bottom={bottom}
          plainText={type === 'text'}
          credits={credits}
          center
        />
      );
    }
  };

  useEffect(() => {
    listOfVideos = Array.from(document.querySelectorAll('video'));
    loadNextVideo();
  }, []);

  console.log(data[0].id);

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
            {determineBackgroundType(
              e.type,
              e.src,
              e.sub,
              e.tg,
              width >= 1025,
              e.desktopSrc,
              e.id,
            )}
            {determineContentType(index, e, width >= 1025)}
            <Arrows type={e.type} desktop={width >= 1025} index={i} />
          </div>
        ))}
      </Swiper>
    </>
  );
};

const Div100vhMinusYleHeader = ({children}) => {
  // This WRAPPER does two things:
  // 1.It calculates the real 100vh by reducing the browser UI bottom/top bar. This is done with <Div100vh>.
  // 2.It reduces yle header height from the available space
  const yleHeader = document.querySelector('.yle-header-container');
  let yleHeaderHeight = yleHeader ? yleHeader.clientHeight : 0;
  return (
    <Div100vh>
      <div
        className="full-height-wrapper"
        style={{height: `calc(100% - ${yleHeaderHeight}px)`}}>
        {children}
      </div>
    </Div100vh>
  );
};

//<Helmet>
//<link
//href="https://fonts.googleapis.com/css?family=Oswald:200,300,400,500,600,700&display=swap"
//rel="stylesheet"
///>
//</Helmet>

const App = () => {
  document.body.style.margin = '0';
  const [currentIndex, updateCurrentIndex] = useState(0);
  const [nextSlideFunc, storeNextSlideFunc] = useState(() => () => null);
  return (
    <div className={'app'}>
      <Header index={currentIndex} nextSlideFunc={nextSlideFunc} />
      <Div100vhMinusYleHeader>
        <VideoSwiper
          storeNextSlideFunc={storeNextSlideFunc}
          index={currentIndex}
          updateCurrentIndex={updateCurrentIndex}
        />
      </Div100vhMinusYleHeader>
    </div>
  );
};
const startApp = async root => {
  ReactDOM.render(<App />, root);
};

export default startApp;
