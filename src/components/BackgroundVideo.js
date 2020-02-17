import React, {useRef, useState, useEffect} from 'react';
import {ProgressBar} from '../components/pagination';
import {createSubtitleTrack, secondsToTime} from '../helpers/index.js';
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

export default BackgroundVideo;
