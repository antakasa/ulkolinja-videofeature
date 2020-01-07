const checkAnalytics = () =>
  typeof window.yleAnalytics !== 'undefined' &&
  typeof window.yleAnalytics.trackEvent !== 'undefined'
    ? window.yleAnalytics.trackEvent
    : (a, b) => console.log(`analytiikkaevent ${a} rekisteröity offline`);

const pageName = 'Ulkolinja-venaja';

export default {
  registerEvent: name => {
    const trackEvent = checkAnalytics();
    trackEvent(`${pageName}.${name}`, {
      pageName,
    });
  },
};
