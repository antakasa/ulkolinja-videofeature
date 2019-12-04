import {videos} from '../data';
import './pagination.css';
import React from 'react';
import {data} from '../data';

export const ProgressBar = ({percentage}) => {
  return (
    <div className="progress-bar">
      <Filler percentage={percentage} />
    </div>
  );
};

const Filler = ({percentage}) => {
  return <div className="filler" style={{width: `${percentage}%`}} />;
};

const Pagination = ({index, splitScreen}) => {
  const cssClasses = () => {
    if (!splitScreen) {
      return 'pagination full-screen-pagination';
    } else if (splitScreen) {
      return 'pagination split-screen-pagination';
    } else {
      return 'pagination';
    }
  };
  if (index === 0) return null;
  if (data[index].type === 'finalPage') return null;
  return (
    <div className={cssClasses()}>
      <div style={{width: '90%', height: '12px'}}>
        <ProgressBar percentage={(index / (data.length - 1)) * 100} />
      </div>
    </div>
  );
};

//<div>{JSON.stringify(index) + '/' + JSON.stringify(data.length)}</div>

export default Pagination;
