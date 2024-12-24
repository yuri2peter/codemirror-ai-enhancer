import {
  EditorSelection,
  EditorState,
  TransactionSpec,
} from '@codemirror/state';

export function insertCompletionText(
  state: EditorState,
  text: string,
  from: number,
  to: number
): TransactionSpec {
  return {
    ...state.changeByRange(() => {
      return {
        changes: { from: from, to: to, insert: text },
        range: EditorSelection.cursor(from + text.length),
      };
    }),
  };
}
