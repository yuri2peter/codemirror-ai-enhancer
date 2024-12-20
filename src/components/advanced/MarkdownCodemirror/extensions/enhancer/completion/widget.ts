import { WidgetType } from '@codemirror/view';
import {
  EditorSelection,
  EditorState,
  EditorView,
  TransactionSpec,
} from '@uiw/react-codemirror';
import { CompletionState } from './state';

export class CompletionWidget extends WidgetType {
  suggestion: string;

  /**
   * Create a new suggestion widget.
   */
  constructor(suggestion: string) {
    super();
    this.suggestion = suggestion;
  }
  toDOM(view: EditorView) {
    const span = document.createElement('span');
    span.style.opacity = '0.4';
    span.style.cursor = 'pointer';
    span.className = 'cm-enhancer-inline-suggestion';
    span.textContent = this.suggestion;
    span.onclick = (e) => this.accept(e, view);
    return span;
  }
  accept(e: MouseEvent, view: EditorView) {
    e.stopPropagation();
    e.preventDefault();

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
  }
}

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
