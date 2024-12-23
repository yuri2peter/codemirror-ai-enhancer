import { keymapExt } from './keymapExt';
import { renderInlineComposePlugin } from './inlineRender';
import { ComposeState } from './state';
import { renderCommandComposePlugin } from './commandRender';

export function compose() {
  return [
    keymapExt,
    ComposeState,
    renderInlineComposePlugin,
    renderCommandComposePlugin,
  ];
}
