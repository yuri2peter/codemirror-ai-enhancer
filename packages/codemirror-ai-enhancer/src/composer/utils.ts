import { EditorView } from '@codemirror/view';
import { ComposerEffect } from './state';

export function exitCommand(view: EditorView) {
  view.dispatch({
    effects: [ComposerEffect.of({ dialogOpened: false, text: '' })],
  });
  view.focus();
}
