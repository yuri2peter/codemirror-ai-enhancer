import { WidgetType } from '@codemirror/view';
import { EditorView } from '@uiw/react-codemirror';
import { insertCompletionText } from '../utils';

export class ComposerInlineWidget extends WidgetType {
  suggestion: string;

  /**
   * Create a new suggestion widget.
   */
  constructor(suggestion: string) {
    super();
    this.suggestion = suggestion;
  }
  toDOM(view: EditorView) {
    const textDom = document.createElement('span');
    textDom.style.cursor = 'pointer';
    textDom.className = 'cm-enhancer-inline-suggestion';
    textDom.textContent = this.suggestion;
    textDom.onclick = (e) => this.accept(e, view);
    return textDom;
  }
  accept(e: MouseEvent, view: EditorView) {
    e.stopPropagation();
    e.preventDefault();

    const suggestionText = this.suggestion;

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
