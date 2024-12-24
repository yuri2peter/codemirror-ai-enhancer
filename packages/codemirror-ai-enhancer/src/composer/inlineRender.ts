import {
  Decoration,
  DecorationSet,
  ViewPlugin,
  ViewUpdate,
} from '@codemirror/view';
import { ComposerState } from './state';
import { EditorView } from '@codemirror/view';
import { ComposerInlineWidget } from './inlineWidget';
import { Range } from '@codemirror/state';

export const renderComposerInlinePlugin = ViewPlugin.fromClass(
  class Plugin {
    decorations: DecorationSet;
    constructor() {
      // Empty decorations
      this.decorations = Decoration.none;
    }
    update(update: ViewUpdate) {
      const composerText = update.state.field(ComposerState)?.text;
      if (!composerText) {
        this.decorations = Decoration.none;
        return;
      }
      this.decorations = composerInlineDecoration(update.view, composerText);
    }
  },
  {
    decorations: (v) => v.decorations,
  }
);

function composerInlineDecoration(view: EditorView, composerText: string) {
  const pos = view.state.selection.main.to;
  const widgets: Range<Decoration>[] = [];
  const w = Decoration.widget({
    widget: new ComposerInlineWidget(composerText),
    side: 1,
  });
  widgets.push(w.range(pos));
  return Decoration.set(widgets);
}
