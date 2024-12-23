import { EditorView, Prec } from '@uiw/react-codemirror';
import { keymap } from '@uiw/react-codemirror';
import { ComposeEffect, ComposeState } from './state';
import { insertCompletionText } from '../utils';
import { exitCommand } from './utils';

export const keymapExt = Prec.highest(
  keymap.of([
    {
      key: 'Mod-k',
      run: (view: EditorView) => {
        view.dispatch({
          effects: [ComposeEffect.of({ dialogOpened: true })],
        });
        return true;
      },
    },
    {
      key: 'Escape',
      run: (view: EditorView) => {
        const state = view.state.field(ComposeState);
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
    {
      key: 'Tab',
      run: (view: EditorView) => {
        const state = view.state.field(ComposeState);
        if (state) {
          const { dialogOpened, text } = state;
          if (!dialogOpened && !!text) {
            view.dispatch({
              ...insertCompletionText(
                view.state,
                text,
                view.state.selection.main.from,
                view.state.selection.main.to
              ),
            });
            return true;
          }
        }
        return false;
      },
    },
  ])
);
