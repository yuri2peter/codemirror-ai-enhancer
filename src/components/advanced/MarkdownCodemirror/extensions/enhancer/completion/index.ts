import { keymapExt } from './keymapExt';
import { renderCompletionPlugin } from './render';
import { CompletionState } from './state';

export function completion() {
  return [renderCompletionPlugin, keymapExt, CompletionState];
}
