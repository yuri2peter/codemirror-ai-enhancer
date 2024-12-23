import { EditorView } from '@uiw/react-codemirror';
import { enhancerConfigFacet } from '../facet';
import { AssistantEffect } from './state';
import { buildAssistantPrompt as defaultBuildAssistantPrompt } from '../promptBuilder';

export function generate(view: EditorView, command: string) {
  const { state } = view;
  const { completion, buildAssistantPrompt } = state.facet(enhancerConfigFacet);
  const { from, to } = state.selection.ranges[0];
  const text = state.doc.toString();
  const prefix = text.slice(0, to);
  const suffix = text.slice(from);
  const prompt = (buildAssistantPrompt || defaultBuildAssistantPrompt)({
    prefix,
    suffix,
    selection: text.slice(from, to),
    command,
  });
  const resHandler = completion(prompt);
  view.dispatch({
    effects: [
      AssistantEffect.of({ text: ' Generating...', dialogOpened: false }),
    ],
  });
  resHandler.onChange((text) => {
    view.dispatch({
      effects: [AssistantEffect.of({ text })],
    });
    view.focus();
  });
}
