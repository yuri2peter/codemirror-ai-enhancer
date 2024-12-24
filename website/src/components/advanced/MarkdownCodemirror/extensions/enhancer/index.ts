import { completion } from './completion';
import { composer } from './composer';
import { assistant } from './assistant';
import { EnhancerConfig } from './defines';
import { enhancerConfigFacet } from './facet';

export type { EnhancerConfig };

export function aiEnhancer(config: EnhancerConfig) {
  return [
    completion(),
    composer(),
    assistant(),
    enhancerConfigFacet.of(config),
  ];
}
