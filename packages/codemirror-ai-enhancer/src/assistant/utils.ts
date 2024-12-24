import { EditorView } from '@codemirror/view';
import { AssistantEffect } from './state';

export function exitCommand(view: EditorView) {
  view.dispatch({
    effects: [AssistantEffect.of({ dialogOpened: false, text: '' })],
  });
  view.focus();
}
