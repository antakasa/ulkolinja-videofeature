import React, {useEffect, useRef, useState} from 'react';
import './areenaClip.css';

const AreenaClip = ({id, renderNow}) => {
  const player = useRef(null);
  const [rendered, registerRender] = useState(false);
  const render = () => {
    const {yleVisualisation} = window;
    let embedYlePlayer = yleVisualisation
      ? yleVisualisation.embedYlePlayer
      : window.embedYlePlayer;
    if (embedYlePlayer) {
      embedYlePlayer(player.current, id, {playFullScreen: true});
    }
  };

  useEffect(() => {
    if (renderNow && !rendered) {
      console.log('render areena player');
      registerRender(true);
      render();
    }
  }, [renderNow]);

  return <div className="yo-areena-player" ref={player} />;
};

export default AreenaClip;
