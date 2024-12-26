import { EditorView } from '@codemirror/view';
import { enhancerConfigFacet } from '../facet';
import { CompletionEffect } from './state';

export function generate(view: EditorView) {
  const { state } = view;
  const { doc } = state;
  const { insert } = view.state.facet(enhancerConfigFacet);
  const { to } = state.selection.ranges[0];
  const text = state.doc.toString();
  const prefix = text.slice(0, to);
  const suffix = text.slice(to);
  insert({
    prefix,
    suffix,
    selection: '',
    command:
      'Continue writing the text from the current cursor position while maintaining the context and tone of the existing text. Max-Length: 30 words. Could be incomplete.',
    onTextChange: (text) => {
      view.dispatch({
        effects: [CompletionEffect.of({ text, doc })],
      });
    },
  });
  view.focus();
  view.dispatch({
    effects: [CompletionEffect.of({ text: ' Generating...', doc })],
  });
}
