'use client';
import { SWRConfig, SWRConfiguration } from 'swr';

const defaultFetcher = async (url: string) => {
  const res = await fetch(url);
  return res.json();
};

export const SWRProvider = ({
  value,
  children,
}: {
  value?: SWRConfiguration;
  children?: React.ReactNode;
}) => {
  return (
    <SWRConfig
      value={{
        fetcher: defaultFetcher,
        ...value,
      }}
    >
      {children}
    </SWRConfig>
  );
};
