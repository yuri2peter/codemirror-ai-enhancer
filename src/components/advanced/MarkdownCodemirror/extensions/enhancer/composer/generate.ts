import { EditorView } from '@uiw/react-codemirror';
import { enhancerConfigFacet } from '../facet';
import { ComposerEffect } from './state';
import {
  buildInsertPrompt as defaultBuildInsertPrompt,
  buildRewritePrompt as defaultBuildRewritePrompt,
} from '../promptBuilder';

export function generate(view: EditorView, command: string) {
  const { state } = view;
  const { completion, buildInsertPrompt, buildRewritePrompt } =
    state.facet(enhancerConfigFacet);
  const { from, to } = state.selection.ranges[0];
  const selectionLength = to - from;
  const text = state.doc.toString();
  const prefix = text.slice(0, to);
  const suffix = text.slice(from);
  const prompt = selectionLength
    ? (buildRewritePrompt || defaultBuildRewritePrompt)({
        prefix,
        suffix,
        selection: text.slice(from, to),
        command,
      })
    : (buildInsertPrompt || defaultBuildInsertPrompt)({
        prefix,
        suffix,
        command,
      });
  const resHandler = completion(prompt);
  view.dispatch({
    effects: [
      ComposerEffect.of({ text: ' Generating...', dialogOpened: false }),
    ],
  });
  resHandler.onChange((text) => {
    view.dispatch({
      effects: [ComposerEffect.of({ text })],
    });
    view.focus();
  });
}
