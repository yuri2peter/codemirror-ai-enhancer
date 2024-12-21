import {
  Decoration,
  DecorationSet,
  ViewPlugin,
  ViewUpdate,
} from '@codemirror/view';
import { ComposeState } from './state';
import { EditorView } from '@uiw/react-codemirror';
import { ComposeInlineWidget } from './inlineWidget';

export const renderInlineComposePlugin = ViewPlugin.fromClass(
  class Plugin {
    decorations: DecorationSet;
    constructor() {
      // Empty decorations
      this.decorations = Decoration.none;
    }
    update(update: ViewUpdate) {
      const composeText = update.state.field(ComposeState)?.text;
      if (!composeText) {
        this.decorations = Decoration.none;
        return;
      }
      this.decorations = inlineComposeDecoration(update.view, composeText);
    }
  },
  {
    decorations: (v) => v.decorations,
  }
);

function inlineComposeDecoration(view: EditorView, composeText: string) {
  const pos = view.state.selection.main.to;
  const widgets = [];
  const w = Decoration.widget({
    widget: new ComposeInlineWidget(composeText),
    side: 1,
  });
  widgets.push(w.range(pos));
  return Decoration.set(widgets);
}
