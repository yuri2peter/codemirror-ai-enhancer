import { Facet } from '@uiw/react-codemirror';
import { EnhancerConfig } from './defines';

export const enhancerConfigFacet = Facet.define<EnhancerConfig, EnhancerConfig>(
  {
    combine(value) {
      return value.at(-1)!;
    },
  }
);
