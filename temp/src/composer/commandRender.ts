import {
  Decoration,
  DecorationSet,
  ViewPlugin,
  ViewUpdate,
} from '@codemirror/view';
import { ComposerState } from './state';
import { EditorView } from '@codemirror/view';
import { ComposerCommandWidget } from './commandWidget';
import { Range } from '@codemirror/state';

export const renderComposerCommandPlugin = ViewPlugin.fromClass(
  class Plugin {
    decorations: DecorationSet;
    constructor() {
      // Empty decorations
      this.decorations = Decoration.none;
    }
    update(update: ViewUpdate) {
      const dialogOpened = update.state.field(ComposerState)?.dialogOpened;
      if (!dialogOpened) {
        this.decorations = Decoration.none;
        return;
      }
      this.decorations = composerCommandDecoration(update.view);
    }
  },
  {
    decorations: (v) => v.decorations,
  }
);

function composerCommandDecoration(view: EditorView) {
  const pos = view.state.selection.main.to;
  const widgets: Range<Decoration>[] = [];
  const w = Decoration.widget({
    widget: new ComposerCommandWidget(),
    side: 1,
  });
  widgets.push(w.range(pos));
  return Decoration.set(widgets);
}
