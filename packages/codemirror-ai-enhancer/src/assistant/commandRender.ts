import {
  Decoration,
  DecorationSet,
  ViewPlugin,
  ViewUpdate,
} from '@codemirror/view';
import { AssistantState } from './state';
import { EditorView } from '@codemirror/view';
import { AssistantCommandWidget } from './commandWidget';
import { Range } from '@codemirror/state';

export const renderAssistantCommandPlugin = ViewPlugin.fromClass(
  class Plugin {
    decorations: DecorationSet;
    constructor() {
      // Empty decorations
      this.decorations = Decoration.none;
    }
    update(update: ViewUpdate) {
      const dialogOpened = update.state.field(AssistantState)?.dialogOpened;
      if (!dialogOpened) {
        this.decorations = Decoration.none;
        return;
      }
      this.decorations = commandAssistantDecoration(update.view);
    }
  },
  {
    decorations: (v) => v.decorations,
  }
);

function commandAssistantDecoration(view: EditorView) {
  const pos = view.state.selection.main.to;
  const widgets: Range<Decoration>[] = [];
  const w = Decoration.widget({
    widget: new AssistantCommandWidget(),
    side: 1,
  });
  widgets.push(w.range(pos));
  return Decoration.set(widgets);
}
