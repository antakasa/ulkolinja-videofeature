import React from 'react';
import './paragraphCover.css';
import Pagination from './pagination';
import BrandLogo from '../images/ulkolinja_logo.svg';
import AreenaClip from './areenaClip';
import ShareButtons from './shareButtons';
import {data} from '../data';
const FinalPage = ({index, swiper, areenaId}) => {
  const shouldRenderAreena = () => {
    if (swiper && swiper.realIndex) {
      const index = swiper.realIndex;
      return data[index].type === 'finalPage';
    } else {
      return false;
    }
  };

  return (
    <>
      <div className="cover cover-middle">
        <img
          className="cover-brand-image"
          alt="Ulkolinjan logo"
          src={BrandLogo}
        />
        <h2 className="cover-title">Tästä pääset syvemmälle</h2>
        <AreenaClip id={areenaId} renderNow={shouldRenderAreena()} />
        <ShareButtons url={window.location.href} />
      </div>
      <div className="cover-gradient" />
    </>
  );
};

export default FinalPage;
