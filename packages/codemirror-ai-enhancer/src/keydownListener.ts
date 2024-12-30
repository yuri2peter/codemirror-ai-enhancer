import { EditorView, ViewPlugin } from '@codemirror/view';

export const keydownListenerPlugin = ViewPlugin.fromClass(
  class {
    handleClearListener: () => void;
    constructor(view: EditorView) {
      // Capture keydown event for hotkeys
      const handleKeydown = (e: KeyboardEvent) => {
        const isModKey = e.ctrlKey || e.metaKey;
        const isHotKey = ['j', 'k', 'l'].includes(e.key);
        if (isModKey && isHotKey) {
          e.preventDefault();
          e.stopPropagation();
        }
      };
      view.dom.addEventListener('keydown', handleKeydown);
      this.handleClearListener = () => {
        view.dom.removeEventListener('keydown', handleKeydown);
      };
    }

    destroy() {
      this.handleClearListener();
    }
  }
);
