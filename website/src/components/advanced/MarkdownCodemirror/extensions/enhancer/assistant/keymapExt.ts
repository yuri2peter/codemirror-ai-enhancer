import { EditorView, Prec } from '@uiw/react-codemirror';
import { keymap } from '@uiw/react-codemirror';
import { AssistantEffect, AssistantState } from './state';
import { exitCommand } from './utils';

export const keymapExt = Prec.highest(
  keymap.of([
    {
      key: 'Mod-l',
      run: (view: EditorView) => {
        view.dispatch({
          effects: [AssistantEffect.of({ dialogOpened: true, text: '' })],
        });
        return true;
      },
    },
    {
      key: 'Escape',
      run: (view: EditorView) => {
        const state = view.state.field(AssistantState);
        if (state) {
          const { dialogOpened, text } = state;
          if (dialogOpened || !!text) {
            exitCommand(view);
            return true;
          }
        }
        return false;
      },
    },
  ])
);
