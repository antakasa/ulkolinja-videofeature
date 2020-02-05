
import React, {useEffect, useState} from 'react';
import {useCMS, useForm, useLocalForm, useWatchFormValues} from 'tinacms';

const useContentSystem = ({initialValues, fields, filepath}) => {
    const cms = useCMS();
  
    const getContents = () =>
      cms.api.git.show(filepath).then(e => {
        const data = JSON.parse(e.content);
        return data;
      });
  
    const writeToDisk = async data =>
      cms.api.git
        .writeToDisk({
          fileRelativePath: filepath,
          content: JSON.stringify({
            ...(await getContents()),
            ...data,
          }),
        })
        .then(() => {
          return cms.api.git.commit({
            files: [filepath],
            message: `Commit from Tina: Update ${filepath}`,
          });
        });
  
    const [cover] = useLocalForm({
      id: filepath,
      label: 'Edit cover page',
      initialValues: initialValues,
      fields: fields,
      onSubmit(data) {
        writeToDisk(data);
      },
    });
  
    return cover;
  };

  export default useContentSystem;