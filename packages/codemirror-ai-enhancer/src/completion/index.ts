import { keymapExt } from './keymapExt';
import { renderCompletionInlinePlugin } from './inlineRender';
import { CompletionState } from './state';

export function completion() {
  return [renderCompletionInlinePlugin, keymapExt, CompletionState];
}
