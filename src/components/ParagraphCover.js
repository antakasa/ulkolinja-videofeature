import React, {useEffect, useState} from 'react';
import './paragraphCover.css';
import Pagination from './pagination';
import BrandLogo from '../images/ulkolinja_logo.png';
import AreenaClip from './areenaClip';
import {useContentSystem} from "../helpers";

const ParagraphCover = ({index, id, desktop, header, subHeader, guwa}) => {

  const initialValues = {
    header1: header,
    subheader: subHeader,
    guwa: guwa
  };

  const fields = [
    {name: 'header1', label: 'header', component: 'text'},
    {name: 'subheader', label: 'sub header', component: 'text'},
    {
      name: "guwa",
      label: "Taustaguwa",
      component: "image",
      parse: filename => `/content/images/${filename}`,

      previewSrc: (formValues, { input }) => {
        return formValues[input.name]
      },

      uploadDir: () => {
        return "src/public/content/images/"
      }}
  ];

  const filepath = `src/data/slides/coverPage.json`;

  const cover = useContentSystem({initialValues, fields, filepath});

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
          <h3 className="cover-subtitle">{cover.subheader}</h3>
        </div>
      </div>
      <div className="cover-gradient" />
    </>
  );
};

export default ParagraphCover;
