/* eslint-disable @next/next/no-img-element */
'use client';
import type { ImageProps } from 'next/image';
import Image from 'next/image';
import React, { useEffect, useState } from 'react';
import fallbackImage from './placeholder.jpg';

const defaultFallbackSrc = fallbackImage.src;

interface ImageFb extends ImageProps {
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
    <Image
      alt={alt}
      src={imgSrc}
      onLoad={(result) => {
        if (result.currentTarget.naturalWidth === 0) {
          set_imgSrc(fallbackSrc); // Fallback image
        }
      }}
      onError={() => {
        set_imgSrc(fallbackSrc);
      }}
      placeholder="blur"
      blurDataURL={fallbackSrc}
      {...rest}
    />
  );
};

export default function NextImageFb({
  src,
  alt,
  fallbackSrc = defaultFallbackSrc,
  ...rest
}: ImageFb) {
  if (!src || (typeof src === 'string' && !src.startsWith('/'))) {
    return (
      <ImageFb
        src={fallbackSrc}
        alt={alt}
        fallbackSrc={fallbackSrc}
        {...rest}
      />
    );
  }
  return (
    <ImageFb
      src={src || fallbackSrc}
      alt={alt}
      fallbackSrc={fallbackSrc}
      {...rest}
    />
  );
}
