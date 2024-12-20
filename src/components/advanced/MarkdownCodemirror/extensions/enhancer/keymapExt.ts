import { EditorView, Prec } from '@uiw/react-codemirror';
import { keymap } from '@uiw/react-codemirror';

export const keymapExt = Prec.highest(
  keymap.of([
    {
      key: 'Mod-j',
      run: (_view: EditorView) => {
        console.log('aiEnhancer keymap: mod + j');
        return true;
      },
    },
    {
      key: 'Mod-k',
      run: (_view: EditorView) => {
        console.log('aiEnhancer keymap: mod + k');
        return true;
      },
    },
    {
      key: 'Mod-l',
      run: (_view: EditorView) => {
        console.log('aiEnhancer keymap: mod + l');
        return true;
      },
    },
    {
      key: 'Tab',
      run: (_view: EditorView) => {
        console.log('aiEnhancer keymap: tab');
        return true;
      },
    },
  ])
);
