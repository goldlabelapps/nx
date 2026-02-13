'use client';
import * as React from 'react';
import type { ReactNode } from 'react';
import type { T_Config } from '../types';
import { Provider } from 'react-redux';
import { store } from './store';
import { setUbereduxKey } from './store';

type LangData = {
  default: string;
  local: string;
  switch: string;
};

export default function UbereduxProvider({
  config,
  children,
}: {
  config?: T_Config;
  children: ReactNode;
}) {
  React.useEffect(() => {
    if (config && config.cartridges?.lingua) {
      const linguaConfig = config.cartridges.lingua;
      const langsRaw = linguaConfig.languages || {};
      // Map config languages to expected shape
      const langs: Record<string, LangData> = {};
      Object.entries(langsRaw).forEach(([code, data]: [string, any]) => {
        langs[code] = {
          default: data.name,
          local: data.name,
          switch: data.name,
        };
      });
      const defaultLang = linguaConfig.defaultLanguage || Object.keys(langs)[0] || 'de';
      store.dispatch(setUbereduxKey({
        key: 'lingua',
        value: {
          cartridge: 'lingua',
          lang: defaultLang,
          langs,
        },
      }));
    }
  }, [config]);
  return <Provider store={store}>{children}</Provider>;
}
