import React from 'react';
import logo from '../images/ulkolinja_logo_pieni.png';
import Pagination from './pagination';
import './header.css';
import {data} from '../data';
import tap from '../images/tap_toka.svg';
const Header = ({index, splitScreen, nextSlideFunc, mobile}) => {
  const cssClasses = () => {
    if (!splitScreen) {
      return 'pagination full-screen-pagination';
    } else if (splitScreen) {
      return 'pagination split-screen-pagination';
    } else {
      return 'pagination';
    }
  };

  let notVisible = () => {
    const slide = data[index];
    const testBooleans = [slide.type === 'finalPage', slide.credits];
    if (testBooleans.indexOf(true) >= 0) {
      return true;
    } else return false;
  };

  ['finalPage', 'credits1', 'credits2']; // logo not visible on these slides

  return (
    <div className={'venezuela-header'}>
      <Pagination index={index} />
      {index > 0 && (
        <div className="logo-and-instructions">
          {
            <>
              <img
                src={logo}
                className="venezuela-ul-logo"
                alt="Ulkolinjan logo"
                style={{
                  visibility: notVisible() ? 'hidden' : '',
                }}
              />
              {mobile && index !== data.length - 1 && (
                <div onClick={() => nextSlideFunc()}>
                  <img src={tap} />
                </div>
              )}
            </>
          }
        </div>
      )}
    </div>
  );
};

export default Header;
