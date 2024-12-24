import { Facet } from '@codemirror/state';
import { EnhancerConfig } from './defines';

export const enhancerConfigFacet = Facet.define<EnhancerConfig, EnhancerConfig>(
  {
    combine(value) {
      return value[value.length - 1]!;
    },
  }
);
