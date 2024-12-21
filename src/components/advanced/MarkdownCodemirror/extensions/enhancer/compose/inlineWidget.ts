import { WidgetType } from '@codemirror/view';
import { EditorView } from '@uiw/react-codemirror';
import { ComposeState } from './state';
import { insertCompletionText } from '../utils';

export class ComposeInlineWidget extends WidgetType {
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

    const suggestionText = view.state.field(ComposeState)?.text;

    // If there is no suggestion, do nothing and let the default keymap handle it
    if (!suggestionText) {
      return false;
    }

    view.dispatch({
      ...insertCompletionText(
        view.state,
        suggestionText,
        view.state.selection.main.from,
        view.state.selection.main.to
      ),
    });
    return true;
  }
}
