import { completion } from './completion';
import { compose } from './compose';
import { EnhancerConfig } from './defines';
import { enhancerConfigFacet } from './facet';

export type { EnhancerConfig };

export function aiEnhancer(config: EnhancerConfig) {
  return [completion(), compose(), enhancerConfigFacet.of(config)];
}
