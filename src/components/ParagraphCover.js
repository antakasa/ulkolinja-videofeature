import React, {useEffect, useState} from 'react';
import './paragraphCover.css';
import Pagination from './pagination';
import BrandLogo from '../images/ulkolinja_logo.png';
import AreenaClip from './areenaClip';
import {useCMS, useLocalForm, useWatchFormValues} from 'tinacms';
const ParagraphCover = ({index, id, desktop, header, subHeader}) => {
  const cms = useCMS();
  const filepath = `src/data/slides/coverPage.json`;
  const [originalData, setOriginalData] = useState({});

  useEffect(() => {
    cms.api.git.show(filepath).then(e => {
      const data = JSON.parse(e.content);
      if (data) setOriginalData(data);
    });
  }, []);

  console.log(originalData);
  const [cover] = useLocalForm({
    id: filepath,
    label: 'Muokkaa cover',
    initialValues: {
      header1: header,
      subheader: subHeader,
    },
    fields: [
      {name: 'header1', label: 'header', component: 'text'},
      {name: 'subheader', label: 'sub header', component: 'text'},
    ],

    onSubmit(data) {
      console.log(originalData);
      return cms.api.git
        .writeToDisk({
          fileRelativePath: filepath,
          content: JSON.stringify({
            ...originalData,
            header1: data.header,
            subheader: data.subheader,
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
    <>
      <div className={`cover ${desktop ? 'fullscreen' : ''}`}>
        <img
          className="cover-brand-image"
          alt="Ulkolinjan logo"
          src={BrandLogo}
        />
        <div className="title-box">
          <h2 className="cover-title">{cover.header1}</h2>
          <h3 className="cover-subtitle">{cover.subHeader}</h3>
        </div>
      </div>
      <div className="cover-gradient" />
    </>
  );
};

export default ParagraphCover;
