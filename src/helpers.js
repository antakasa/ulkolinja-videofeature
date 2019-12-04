import React, {useState, useLayoutEffect} from 'react';
import CMSData from './data/**/*.json';
import pickBy from 'lodash.pickby';
import compact from 'lodash.compact';

export const secondsToTime = secs => {
  secs = Math.round(secs);
  var hours = Math.floor(secs / (60 * 60));

  var divisor_for_minutes = secs % (60 * 60);
  var minutes = Math.floor(divisor_for_minutes / 60);

  var divisor_for_seconds = divisor_for_minutes % 60;
  var seconds = Math.ceil(divisor_for_seconds);

  var obj = {
    h: hours,
    m: minutes,
    s: ('0' + JSON.stringify(seconds)).slice(-2),
  };
  return obj;
};

export const processData = () => {
  const data = [];
  const {slides, displayOrder} = CMSData;
  console.log(slides);
  displayOrder.data.map(e => {
    const id = e.collectionName;
    const pickedFromSlides = pickBy(
      slides,
      e => e.id.toUpperCase() === id.toUpperCase(),
    );
    console.log(pickedFromSlides);
    const objectData = pickedFromSlides[Object.keys(pickedFromSlides)[0]];
    data.push(objectData);
  });
  return compact(data);
};

function debounce(func, wait, immediate) {
  var timeout;
  return function() {
    var context = this,
      args = arguments;
    var later = function() {
      timeout = null;
      if (!immediate) func.apply(context, args);
    };
    var callNow = immediate && !timeout;
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
    if (callNow) func.apply(context, args);
  };
}

export const useWindowSize = () => {
  let [size, setSize] = useState([0, 0]);
  useLayoutEffect(() => {
    function updateSize() {
      setSize([window.innerWidth, window.innerHeight]);
    }
    window.addEventListener('resize', debounce(updateSize));
    updateSize();
    return () => window.removeEventListener('resize', debounce(updateSize));
  }, []);
  return size;
};

const checkAnalytics = () =>
  typeof window.yleAnalytics !== 'undefined' &&
  typeof window.yleAnalytics.trackEvent !== 'undefined'
    ? window.yleAnalytics.trackEvent
    : (a, b) => console.log(`analytiikkaevent ${a} rekisteröity offline`);

const pageName = 'Ulkolinja-venaja';

export const AnalyticsMethods = {
  registerEvent: name => {
    const trackEvent = checkAnalytics();
    trackEvent(`${pageName}.${name}`, {
      pageName,
    });
  },
};
