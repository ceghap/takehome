import React, { useState, useEffect } from 'react';
import Box from '@mui/material/Box';
import { SUPPORTED_FORMATS } from '../../../private/profile/ProfileValidator';

export const Thumb = ({ file }: { file: Blob | undefined | string }) => {
  const [loading, setLoading] = useState(false);
  const [thumb, setThumb] = useState<string>('');

  useEffect(() => {
    if (file && typeof file !== 'string') {
      setLoading(true);

      console.log(file.type);
      const reader = new FileReader();

      reader.onloadend = () => {
        setLoading(false);

        if (typeof reader.result === 'string') {
          if (SUPPORTED_FORMATS.includes(file.type)) {
            setThumb(reader.result);
          } else {
            setThumb('/preview.jpg');
          }
        }
      };

      reader.readAsDataURL(file);
    }
  }, [file]);

  if (loading) {
    return <p>loading...</p>;
  }

  if (thumb) {
    return (
      <Box>
        <img src={thumb} height='auto' width={500} />
      </Box>
    );
  } else {
    return <img src='/preview.jpg' height='auto' width={500} />;
  }
};
