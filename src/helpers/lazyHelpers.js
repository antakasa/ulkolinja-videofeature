const LazyHelpers = (() => {
  let listOfPics = [];
  let listOfVideos = [];
  const removeFirstFromPicList = () => {
    listOfPics = listOfPics.slice(1, listOfPics.length);
  };
  const removeFirstFromVideoList = () => {
    listOfVideos = listOfVideos.slice(1, listOfVideos.length);
  };

  return {
    initialize: () => {
      listOfVideos = Array.from(document.querySelectorAll('video'));
      listOfPics = Array.from(document.querySelectorAll('.lazy-this'));
    },
    loadNextVideo: () => {
      // This is used to lazy load videos & subitles one by one until all videos are loaded
      if (listOfVideos.length < 1) return;
      const video = listOfVideos[0];
      const videoSource = video.querySelector('source');
      const subTrack = video.querySelector('track');
      videoSource.src = video.dataset.src;
      if (subTrack) {
        subTrack.src = subTrack.dataset.src;
      }
      video.load();

      removeFirstFromVideoList();
    },
    loadNextPic: () => {
      if (listOfPics.length < 1) return;
      const picSource = listOfPics[0];
      picSource.src = picSource.dataset.src;

      removeFirstFromPicList();
    },
    get: type =>
      type === 'video' || type === 'videos' ? listOfVideos : listOfPics,
  };
})();

export default LazyHelpers;
