import { keymapExt } from './keymapExt';
import { renderInlineCompletionPlugin } from './inlineRender';
import { CompletionState } from './state';

export function completion() {
  return [renderInlineCompletionPlugin, keymapExt, CompletionState];
}
