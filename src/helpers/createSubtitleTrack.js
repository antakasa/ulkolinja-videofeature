import subs from '../subs.json';
import {WebVTTParser} from 'webvtt-parser';
const createSubtitleTrack = (video, id, subPath) => {
  if (!video) return;
  const subtitleParser = someVTT => {
    const parser = new WebVTTParser();
    const tree = parser.parse(someVTT, 'metadata');
    return tree;
  };

  if (!id) return;

  const matchingKey = Object.keys(subs).filter(
    e => subPath.indexOf(e.replace('public/', '')) > 0,
  );

  let parsed = subtitleParser(subs[matchingKey[0]]);
  const track = video.current.addTextTrack('subtitles', 'Finnish', 'Fi');
  track.mode = 'showing';
  parsed.cues.map(e =>
    track.addCue(new VTTCue(e.startTime, e.endTime, e.text)),
  );
  return track;
};
export const secondsToTime = secs => {
  secs = Math.round(secs);
  var hours = Math.floor(secs / (60 * 60));

  var divisor_for_minutes = secs % (60 * 60);
  var minutes = Math.floor(divisor_for_minutes / 60);

  var divisor_for_seconds = divisor_for_minutes % 60;
  var seconds = Math.ceil(divisor_for_seconds);

  var obj = {
    h: hours,
    m: minutes,
    s: ('0' + JSON.stringify(seconds)).slice(-2),
  };
  return obj;
};

export default createSubtitleTrack;
