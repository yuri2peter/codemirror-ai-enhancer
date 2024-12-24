import { EditorView } from '@codemirror/view';
import { enhancerConfigFacet } from '../facet';
import { ComposerEffect } from './state';

export function generate(view: EditorView, command: string) {
  const { state } = view;
  const { insert, rewrite } = state.facet(enhancerConfigFacet);
  const { from, to } = state.selection.ranges[0];
  const selectionLength = to - from;
  const text = state.doc.toString();
  const prefix = text.slice(0, to);
  const suffix = text.slice(from);
  (selectionLength ? rewrite : insert)({
    prefix,
    suffix,
    selection: text.slice(from, to),
    command,
    onTextChange: (text) => {
      view.dispatch({
        effects: [ComposerEffect.of({ text })],
      });
    },
  });
  view.focus();
  view.dispatch({
    effects: [
      ComposerEffect.of({ text: ' Generating...', dialogOpened: false }),
    ],
  });
}
