import { EditorView, Prec } from '@uiw/react-codemirror';
import { keymap } from '@uiw/react-codemirror';
import { CompletionEffect, CompletionState } from './state';
import { insertCompletionText } from '../utils';
import { generate } from './generate';

export const keymapExt = Prec.high(
  keymap.of([
    {
      key: 'Mod-j',
      run: (view: EditorView) => {
        generate(view);
        return true;
      },
    },
    {
      key: 'Escape',
      run: (view: EditorView) => {
        const suggestionText = view.state.field(CompletionState)?.suggestion;
        // If there is no suggestion, do nothing and let the default keymap handle it
        if (!suggestionText) {
          return false;
        }
        view.dispatch({
          effects: [
            CompletionEffect.of({
              text: null,
              doc: view.state.doc,
            }),
          ],
        });
        return true;
      },
    },
    {
      key: 'Tab',
      run: (view: EditorView) => {
        const suggestionText = view.state.field(CompletionState)?.suggestion;

        // If there is no suggestion, do nothing and let the default keymap handle it
        if (!suggestionText) {
          return false;
        }

        view.dispatch({
          ...insertCompletionText(
            view.state,
            suggestionText,
            view.state.selection.main.to,
            view.state.selection.main.to
          ),
        });
        return true;
      },
    },
  ])
);
