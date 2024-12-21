import { EditorState } from '@codemirror/state';
import { Tooltip } from '@uiw/react-codemirror';
import { ComposeState } from './state';

export function getComposeCommandTooltips(state: EditorState): Tooltip | null {
  const composeState = state.field(ComposeState);
  if (!composeState) {
    return null;
  }
  const range = state.selection.main;
  const { text, prompt } = composeState;
  return {
    pos: range.from,
    above: true,
    strictSide: true,
    arrow: true,
    create: () => {
      let dom = document.createElement('div');
      dom.className = 'cm-tooltip-cursor';
      dom.textContent = text;
      return { dom };
    },
  };
}
