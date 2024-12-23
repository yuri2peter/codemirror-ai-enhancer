import { EditorView } from '@uiw/react-codemirror';
import { ComposeEffect } from './state';

export function exitCommand(view: EditorView) {
  view.dispatch({
    effects: [ComposeEffect.of({ dialogOpened: false, text: '' })],
  });
  view.focus();
}
