import { StateEffect, StateField } from '@codemirror/state';

export type StateValue = {
  text: string;
  dialogOpened: boolean;
};

export const AssistantEffect = StateEffect.define<Partial<StateValue>>();

export const AssistantState = StateField.define<StateValue>({
  create() {
    return {
      prompt: '',
      text: '',
      dialogOpened: false,
    };
  },
  update(previousValue, tr) {
    const assistantEffect = tr.effects.find((e) => e.is(AssistantEffect));
    if (tr.state.doc) {
      if (assistantEffect) {
        // There is some changes to the compose state, so update it.
        return {
          ...previousValue,
          ...assistantEffect.value,
        };
      } else if (!tr.docChanged && !tr.selection) {
        // This transaction is irrelevant to the document state
        // and could be generate by another plugin, so keep
        // the previous value.
        return previousValue;
      }
    }
    return this.create(tr.state);
  },
});
