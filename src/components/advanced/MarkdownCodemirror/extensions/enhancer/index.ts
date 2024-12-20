import { completion } from './completion';
import { EnhancerConfig } from './defines';
import { enhancerConfigFacet } from './facet';

export type { EnhancerConfig };

export function aiEnhancer(config: EnhancerConfig) {
  return [completion(), enhancerConfigFacet.of(config)];
}
