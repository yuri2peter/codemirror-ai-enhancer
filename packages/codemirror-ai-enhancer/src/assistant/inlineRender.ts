import {
  Decoration,
  DecorationSet,
  ViewPlugin,
  ViewUpdate,
} from '@codemirror/view';
import { AssistantState } from './state';
import { EditorView } from '@codemirror/view';
import { AssistantInlineWidget } from './inlineWidget';
import { Range } from '@codemirror/state';

export const renderAssistantInlinePlugin = ViewPlugin.fromClass(
  class Plugin {
    decorations: DecorationSet;
    constructor() {
      // Empty decorations
      this.decorations = Decoration.none;
    }
    update(update: ViewUpdate) {
      const composeText = update.state.field(AssistantState)?.text;
      if (!composeText) {
        this.decorations = Decoration.none;
        return;
      }
      this.decorations = inlineAssistantDecoration(update.view, composeText);
    }
  },
  {
    decorations: (v) => v.decorations,
  }
);

function inlineAssistantDecoration(view: EditorView, composeText: string) {
  const pos = view.state.selection.main.to;
  const widgets: Range<Decoration>[] = [];
  const w = Decoration.widget({
    widget: new AssistantInlineWidget(composeText),
    side: 1,
  });
  widgets.push(w.range(pos));
  return Decoration.set(widgets);
}
