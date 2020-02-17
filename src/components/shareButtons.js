import React from 'react';
import {
  FacebookShareButton,
  FacebookIcon,
  TwitterIcon,
  TwitterShareButton,
  WhatsappShareButton,
  WhatsappIcon,
} from 'react-share';
import './shareButtons.css';

const color = 'white';

export default ({url}) => (
  <div style={{width: '100%'}}>
    <div
      style={{
        display: 'flex',
        justifyContent: 'space-around',
        marginTop: '20px',
        position: 'relative',
        zIndex: 9999,
      }}>
      <FacebookShareButton url={url}>
        <FacebookIcon
          className="sharebutton-cursor"
          logoFillColor="#2f3131"
          iconBgStyle={{fill: color}}
          size={64}
          round
        />
      </FacebookShareButton>
      <TwitterShareButton
        url={url}
        via={'YleUlkolinja'}
        hashtags={['Venezuela']}
        title={''}>
        <TwitterIcon
          className="sharebutton-cursor"
          logoFillColor="#2f3131"
          iconBgStyle={{fill: color}}
          size={64}
          round
        />
      </TwitterShareButton>
      <WhatsappShareButton url={url}>
        <WhatsappIcon
          className="sharebutton-cursor"
          iconBgStyle={{fill: color}}
          logoFillColor="#2f3131"
          size={64}
          round
        />
      </WhatsappShareButton>
    </div>
  </div>
);
