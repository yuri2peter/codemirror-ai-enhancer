import { keymapExt } from './keymapExt';
import { renderComposerInlinePlugin } from './inlineRender';
import { ComposerState } from './state';
import { renderComposerCommandPlugin } from './commandRender';

export function composer() {
  return [
    keymapExt,
    ComposerState,
    renderComposerInlinePlugin,
    renderComposerCommandPlugin,
  ];
}
