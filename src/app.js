import './index.css';
import 'swiper/dist/css/swiper.css';
import React, {useEffect, useRef, useState} from 'react';
import ReactDOM from 'react-dom';
import {useWindowSize} from './helpers/index.js';
import Header from './components/header';
import Div100vhMinusYleHeader from './components/Div100vhMinusYleHeader';
import Swiper from './components/Swiper';

const App = () => {
  document.body.style.margin = '0';
  const [currentIndex, updateCurrentIndex] = useState(0);
  const [nextSlideFunc, storeNextSlideFunc] = useState(() => () => null);
  const [width, height] = useWindowSize();
  return (
    <div className={'app'}>
      <Header
        index={currentIndex}
        nextSlideFunc={nextSlideFunc}
        mobile={width < 900}
      />
      <Div100vhMinusYleHeader>
        <Swiper
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
