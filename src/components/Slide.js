import React from 'react';
import {useWindowSize, playAndPause} from '../helpers/index.js';
import {Arrows} from './index.js';
import {
  determineBackgroundType,
  determineContentType,
} from '../helpers/index.js';
import {useCMS, useLocalForm, useWatchFormValues} from 'tinacms';

const SlideContainer = ({
  e,
  triggerCoverLoaded,
  goPrev,
  index,
  goNext,
  swiper,
  prevClickAvailable,
  nextClickAvailable,
}) => {
  // grab the instance of the CMS to access the registered git API
  let cms = useCMS();
  const filepath = `src/data/slides/${e.id.replace('.', '')}.json`;
  const [width, height] = useWindowSize();
  const isDesktop = width >= 1025;

  console.log(
    cms.api.git.show(filepath).then(e => console.log(JSON.parse(e.content))),
  );

  let [post, form] = useLocalForm({
    id: filepath, // needs to be unique
    label: `Muokkaa ${e.id}`,

    // starting values for the post object
    initialValues: {
      text: e.text,
    },

    // field definition
    fields: [
      {
        name: 'text',
        label: 'text',
        component: 'text',
      },
    ],

    // save & commit the file when the "save" button is pressed
    onSubmit(data) {
      return cms.api.git
        .writeToDisk({
          fileRelativePath: filepath,
          content: JSON.stringify({
            ...e,
            text: data.text,
          }),
        })
        .then(() => {
          return cms.api.git.commit({
            files: [filepath],
            message: `Commit from Tina: Update ${filepath}`,
          });
        });
    },
  });

  return (
    <div>
      {prevClickAvailable && <div onClick={goPrev} id="prev-catch" />}
      {nextClickAvailable && <div onClick={goNext} id="next-catch" />}
      {determineBackgroundType(e, isDesktop, triggerCoverLoaded)}
      {determineContentType(index, e, isDesktop, swiper)}
      <Arrows type={e.type} desktop={isDesktop} index={index} />
    </div>
  );
};

export default SlideContainer;
