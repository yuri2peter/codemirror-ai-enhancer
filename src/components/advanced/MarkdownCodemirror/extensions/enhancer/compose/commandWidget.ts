import { WidgetType } from '@codemirror/view';
import { EditorView } from '@uiw/react-codemirror';
import { generate } from './generate';
import { exitCommand } from './utils';

export class ComposeCommandWidget extends WidgetType {
  constructor() {
    super();
  }
  toDOM(view: EditorView) {
    let prompt = '';
    const dom = document.createElement('div');
    dom.className = 'cm-enhancer-compose-command';
    const input = document.createElement('input');
    input.placeholder = 'Enter your command';
    input.oninput = (e) => {
      const value = (e.target as HTMLInputElement).value;
      prompt = value;
    };
    input.onkeydown = (e) => {
      if (e.key === 'Escape') {
        exitCommand(view);
        return;
      }
      if (e.key === 'Enter') {
        if (!prompt) {
          exitCommand(view);
          return;
        }
        generate(view, prompt);
      }
    };
    dom.appendChild(input);
    setTimeout(() => {
      input.focus();
    }, 100);
    return dom;
  }
}
