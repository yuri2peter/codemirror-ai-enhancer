'use client';
import React, { useEffect, useState } from 'react';

const defaultFallbackSrc = '/images/placeholder.jpg';

interface ImageFb extends React.ImgHTMLAttributes<HTMLImageElement> {
  fallbackSrc?: string;
}

const ImageFb: React.FC<ImageFb> = ({
  src,
  alt,
  fallbackSrc = defaultFallbackSrc,
  ...rest
}) => {
  const [imgSrc, set_imgSrc] = useState(src);

  useEffect(() => {
    set_imgSrc(src);
  }, [src]);

  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      alt={alt}
      data-src={src}
      src={imgSrc || fallbackSrc}
      onLoad={(result) => {
        if (result.currentTarget.naturalWidth === 0) {
          set_imgSrc(fallbackSrc); // Fallback image
        }
      }}
      onError={() => {
        set_imgSrc(fallbackSrc);
      }}
      {...rest}
    />
  );
};

export default ImageFb;
