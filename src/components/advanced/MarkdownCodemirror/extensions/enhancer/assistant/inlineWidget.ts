import { WidgetType } from '@codemirror/view';
import { EditorView } from '@uiw/react-codemirror';
import { AssistantEffect } from './state';
export class AssistantInlineWidget extends WidgetType {
  answer: string;

  constructor(answer: string) {
    super();
    this.answer = answer;
  }
  toDOM(view: EditorView) {
    const textDom = document.createElement('p');
    textDom.style.cursor = 'pointer';
    textDom.className = 'cm-enhancer-inline-answer';
    textDom.textContent = this.answer;
    textDom.onclick = (e) => this.accept(e, view);
    return textDom;
  }
  accept(e: MouseEvent, view: EditorView) {
    e.stopPropagation();
    e.preventDefault();

    const answerText = this.answer;

    if (!answerText) {
      return false;
    }
    copyToClipboard(answerText);
    view.dispatch({
      effects: [AssistantEffect.of({ text: 'Copied to clipboard.' })],
    });
    setTimeout(() => {
      view.dispatch({
        effects: [AssistantEffect.of({ text: '' })],
      });
    }, 2000);
    return true;
  }
}

function copyToClipboard(answerText: string) {
  navigator.clipboard.writeText(answerText);
}
