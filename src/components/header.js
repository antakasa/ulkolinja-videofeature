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

  return (
    <div className={'venezuela-header'}>
      <Pagination index={index} />
      {index > 0 && (
        <div className="logo-and-instructions">
          {data[index].type !== 'finalPage' && (
            <>
              <img
                src={logo}
                className="venezuela-ul-logo"
                alt="Ulkolinjan logo"
              />
              {mobile && (
                <div onClick={() => nextSlideFunc()}>
                  <img src={tap} />
                </div>
              )}
            </>
          )}
        </div>
      )}
    </div>
  );
};

export default Header;
