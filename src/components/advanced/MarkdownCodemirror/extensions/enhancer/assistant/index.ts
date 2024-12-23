import { keymapExt } from './keymapExt';
import { renderAssistantInlinePlugin } from './inlineRender';
import { AssistantState } from './state';
import { renderAssistantCommandPlugin } from './commandRender';

export function assistant() {
  return [
    keymapExt,
    AssistantState,
    renderAssistantInlinePlugin,
    renderAssistantCommandPlugin,
  ];
}
