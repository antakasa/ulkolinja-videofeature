import './index.css';
import 'swiper/dist/css/swiper.css';
import React, {useEffect, useRef, useState} from 'react';
import ReactDOM from 'react-dom';
import {useWindowSize} from './helpers/index.js';
import {Swiper, Div100VhMinusYleHeader, Header} from './components/index.js';
import {data} from './data';
import {Tina, TinaCMS} from 'tinacms';
import {GitClient} from '@tinacms/git-client';

const App = () => {
  const [cms] = useState(() => {
    const client = new GitClient('http://localhost:3001/___tina');
    const cms = new TinaCMS();
    cms.registerApi('git', client);
    return cms;
  });
  document.body.style.margin = '0';
  const [currentIndex, updateCurrentIndex] = useState(0);
  const [nextSlideFunc, storeNextSlideFunc] = useState(() => () => null);
  const [width, height] = useWindowSize();
  return (
    <Tina cms={cms} position="displace">
      <div className={'app'}>
        <Header
          index={currentIndex}
          nextSlideFunc={nextSlideFunc}
          mobile={width < 900}
        />
        <Div100VhMinusYleHeader>
          <Swiper
            data={data}
            storeNextSlideFunc={storeNextSlideFunc}
            index={currentIndex}
            updateCurrentIndex={updateCurrentIndex}
          />
        </Div100VhMinusYleHeader>
      </div>
    </Tina>
  );
};
const startApp = async root => {
  ReactDOM.render(<App />, root);
};

export default startApp;
