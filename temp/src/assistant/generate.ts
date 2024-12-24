import { EditorView } from '@codemirror/view';
import { enhancerConfigFacet } from '../facet';
import { AssistantEffect } from './state';

export function generate(view: EditorView, command: string) {
  const { state } = view;
  const { assist } = state.facet(enhancerConfigFacet);
  const { from, to } = state.selection.ranges[0];
  const text = state.doc.toString();
  const prefix = text.slice(0, to);
  const suffix = text.slice(from);
  assist({
    prefix,
    suffix,
    selection: text.slice(from, to),
    command,
    onTextChange: (text) => {
      view.dispatch({
        effects: [AssistantEffect.of({ text })],
      });
    },
  });
  view.focus();
  view.dispatch({
    effects: [
      AssistantEffect.of({ text: ' Generating...', dialogOpened: false }),
    ],
  });
}
