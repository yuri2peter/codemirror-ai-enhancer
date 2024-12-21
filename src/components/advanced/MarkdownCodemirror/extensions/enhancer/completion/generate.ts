import { EditorView } from '@uiw/react-codemirror';
import { enhancerConfigFacet } from '../facet';
import { CompletionEffect } from './state';
import { buildInsertPrompt } from '../promptBuilder';

export function generate(view: EditorView) {
  const { state } = view;
  const { doc } = state;
  const { fetchFn } = view.state.facet(enhancerConfigFacet);
  const { from, to } = state.selection.ranges[0];
  const text = state.doc.toString();
  const prefix = text.slice(0, to);
  const suffix = text.slice(from);
  const prompt = buildInsertPrompt({
    prefix,
    suffix,
    command:
      'Continue writing the text from the current cursor position while maintaining the context and tone of the existing text. Max-Length: 30 words. Could be incomplete.',
  });
  const resHandler = fetchFn(prompt);
  view.dispatch({
    effects: [CompletionEffect.of({ text: ' Generating...', doc })],
  });
  resHandler.onChange((text) => {
    view.dispatch({
      effects: [CompletionEffect.of({ text, doc })],
    });
  });
}
