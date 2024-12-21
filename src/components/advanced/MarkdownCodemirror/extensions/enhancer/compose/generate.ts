import { EditorView } from '@uiw/react-codemirror';
import { enhancerConfigFacet } from '../facet';
import { ComposeEffect } from './state';
import { buildInsertPrompt, buildRewritePrompt } from '../promptBuilder';

export function generate(view: EditorView, command: string) {
  const { state } = view;
  const { fetchFn } = view.state.facet(enhancerConfigFacet);
  const { from, to } = state.selection.ranges[0];
  const selectionLength = to - from;
  const text = state.doc.toString();
  const prefix = text.slice(0, to);
  const suffix = text.slice(from);
  const prompt = selectionLength
    ? buildRewritePrompt({
        prefix,
        suffix,
        selection: text.slice(from, to),
        command,
      })
    : buildInsertPrompt({
        prefix,
        suffix,
        command,
      });
  const resHandler = fetchFn(prompt);
  view.dispatch({
    effects: [ComposeEffect.of({ text: ' Generating...' })],
  });
  resHandler.onChange((text) => {
    view.dispatch({
      effects: [ComposeEffect.of({ text })],
    });
  });
}
