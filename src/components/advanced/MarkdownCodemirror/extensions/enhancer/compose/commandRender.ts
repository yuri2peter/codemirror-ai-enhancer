import {
  Decoration,
  DecorationSet,
  ViewPlugin,
  ViewUpdate,
} from '@codemirror/view';
import { ComposeState } from './state';
import { EditorView } from '@uiw/react-codemirror';
import { ComposeCommandWidget } from './commandWidget';

export const renderCommandComposePlugin = ViewPlugin.fromClass(
  class Plugin {
    decorations: DecorationSet;
    constructor() {
      // Empty decorations
      this.decorations = Decoration.none;
    }
    update(update: ViewUpdate) {
      const dialogOpened = update.state.field(ComposeState)?.dialogOpened;
      if (!dialogOpened) {
        this.decorations = Decoration.none;
        return;
      }
      this.decorations = commandComposeDecoration(update.view);
    }
  },
  {
    decorations: (v) => v.decorations,
  }
);

function commandComposeDecoration(view: EditorView) {
  const pos = view.state.selection.main.to;
  const widgets = [];
  const w = Decoration.widget({
    widget: new ComposeCommandWidget(),
    side: 1,
  });
  widgets.push(w.range(pos));
  return Decoration.set(widgets);
}
