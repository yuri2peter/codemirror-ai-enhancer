import { keymapExt } from './keymapExt';
import { renderInlineComposePlugin } from './inlineRender';
import { ComposeState } from './state';

export function compose() {
  return [keymapExt, ComposeState, renderInlineComposePlugin];
}
