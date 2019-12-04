import '@babel/polyfill';
import startApp from './src/app';

const appName = process.env.APP_NAME;

const eventHandlers = {
  onMount: (name, element, services) => {
    if (name !== appName) {
      console.log(name + ' was mounted, not me.');
      return;
    }
    const root = element.querySelector('#root');
    if (!root) {
      return;
    }
    // If there is a banner ad above the global header, we should remove it in order to fullscreen work properly
    const yleBanner = document.querySelector('.yle-header-ad');
    if (yleBanner) yleBanner.remove();
    startApp(root);
  },
  //Todo: Login handlers
};

const plusAppMethods = {
  embedYlePlayer: function(elem, id, options) {
    window.ylePlayer.render({
      element: elem,
      props: {
        id: id,
        playFullScreen: !!options.playFullScreen,
      },
    });
  },
  login: function() {
    window.console && console.log('login not supported');
  },
};

if (process.env.NODE_ENV === 'production' && window.yleVisualisation) {
  // SYND OR FYND
  window.yleVisualisationEmbeds = window.yleVisualisationEmbeds || {};
  window.yleVisualisationEmbeds[appName] = eventHandlers;
} else if (process.env.NODE_ENV === 'production' && !window.yleVisualisation) {
  // ARTICLE RENDERER OR STATIC HOSTING
  window.embedYlePlayer = plusAppMethods.embedYlePlayer;
  eventHandlers.onMount(appName, document.body, plusAppMethods);
  window.plusApp = window.plusApp || {};
} else if (process.env.NODE_ENV === 'development') {
  if (module.hot) {
    module.hot.dispose(function() {
      // module is about to be replaced
    });

    module.hot.accept(function() {
      // module or one of its dependencies was just updated
    });
  }
  const root = document.querySelector('#root');
  if (root) {
    startApp(root);
  }
} else {
  console.log('no env');
}
