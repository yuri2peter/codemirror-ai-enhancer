import { EditorView, Prec } from '@uiw/react-codemirror';
import { keymap } from '@uiw/react-codemirror';
import { CompletionEffect, CompletionState } from './state';
import { insertCompletionText } from './widget';
import { generate } from './generate';

export const keymapExt = Prec.highest(
  keymap.of([
    {
      key: 'Mod-j',
      run: (view: EditorView) => {
        console.log('aiEnhancer keymap: mod + j');
        generate(view);
        return true;
      },
    },
    {
      key: 'Escape',
      run: (view: EditorView) => {
        console.log('aiEnhancer keymap: escape');
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
        console.log('aiEnhancer keymap: tab');
        const suggestionText = view.state.field(CompletionState)?.suggestion;

        // If there is no suggestion, do nothing and let the default keymap handle it
        if (!suggestionText) {
          return false;
        }

        view.dispatch({
          ...insertCompletionText(
            view.state,
            suggestionText,
            view.state.selection.main.head,
            view.state.selection.main.head
          ),
        });
        return true;
      },
    },
  ])
);
