import {
  Decoration,
  DecorationSet,
  ViewPlugin,
  ViewUpdate,
} from '@codemirror/view';
import { CompletionState } from './state';
import { EditorView } from '@uiw/react-codemirror';
import { CompletionWidget } from './widget';

export const renderCompletionPlugin = ViewPlugin.fromClass(
  class Plugin {
    decorations: DecorationSet;
    constructor() {
      // Empty decorations
      this.decorations = Decoration.none;
    }
    update(update: ViewUpdate) {
      const suggestionText = update.state.field(CompletionState)?.suggestion;
      if (!suggestionText) {
        this.decorations = Decoration.none;
        return;
      }
      this.decorations = inlineSuggestionDecoration(
        update.view,
        suggestionText
      );
    }
  },
  {
    decorations: (v) => v.decorations,
  }
);

function inlineSuggestionDecoration(view: EditorView, suggestionText: string) {
  const pos = view.state.selection.main.head;
  const widgets = [];
  const w = Decoration.widget({
    widget: new CompletionWidget(suggestionText),
    side: 1,
  });
  widgets.push(w.range(pos));
  return Decoration.set(widgets);
}
