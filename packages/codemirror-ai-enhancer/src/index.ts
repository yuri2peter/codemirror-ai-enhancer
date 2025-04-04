import { completion } from './completion';
import { composer } from './composer';
import { assistant } from './assistant';
import { EnhancerConfig } from './defines';
import { enhancerConfigFacet } from './facet';
import { keydownListenerPlugin } from './keydownListener';

export * from './defines';

export function aiEnhancer(config: EnhancerConfig) {
  return [
    keydownListenerPlugin,
    completion(),
    composer(),
    assistant(),
    enhancerConfigFacet.of(config),
  ];
}
