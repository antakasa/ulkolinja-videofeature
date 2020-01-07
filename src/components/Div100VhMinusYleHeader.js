import React from 'react';
import Div100vh from 'react-div-100vh';

const Div100vhMinusYleHeader = ({children}) => {
  // This WRAPPER does two things:
  // 1.It calculates the real 100vh by reducing the browser UI bottom/top bar. This is done with <Div100vh>.
  // 2.It reduces yle header height from the available space
  const yleHeader = document.querySelector('.yle-header-container');
  let yleHeaderHeight = yleHeader ? yleHeader.clientHeight : 0;
  return (
    <Div100vh>
      <div
        className="full-height-wrapper"
        style={{height: `calc(100% - ${yleHeaderHeight}px)`}}>
        {children}
      </div>
    </Div100vh>
  );
};

export default Div100vhMinusYleHeader;
