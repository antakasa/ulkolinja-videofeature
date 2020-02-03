import {
  ParagraphCover,
  FinalPage,
  GraphImage,
  ParagraphChapter,
} from '../components/index.js';
import React from 'react';
const determineContentType = (index, e, desktop, swiper) => {
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
    guwa
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
        id={id}
        guwa={guwa}
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

export default determineContentType;
