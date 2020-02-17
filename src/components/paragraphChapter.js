import React from 'react';
import './paragraphChapter.css';
import Pagination from './pagination';
import ReactMarkdown from 'react-markdown';
import {useWindowSize} from '../helpers/index.js';
import header from '../images/ulkolinja_logo_pieni.png';
const ParagraphChapter = ({
  credits,
  plainText,
  index,
  bottom,
  center,
  text,
  time,
}) => {
  const position = () => {
    if (bottom && width <= 1025) return 'swiper-position-bottom';
    if (center || width >= 1025) return 'swiper-position-center';
  };
  const [width, height] = useWindowSize();
  if (!text) return null;
  return (
    <div className={`mask-on ${position()}`}>
      <div className={`swiper-text ${plainText ? 'plaintext' : 'chapter'}`}>
        <Pagination splitScreen index={index} />
        <div
          className={
            plainText
              ? `plaintext-container ${credits ? 'chapter-credits' : ''}`
              : `chapter-container ${bottom ? 'chapter-bottom' : ''}`
          }>
          {false && <p>{time}</p>}
          <ReactMarkdown linkTarget="_blank" source={text} />
        </div>
      </div>
    </div>
  );
};

export default ParagraphChapter;
