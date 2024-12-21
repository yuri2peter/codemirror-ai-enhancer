import { StateEffect, StateField } from '@codemirror/state';

export type StateValue = {
  prompt: string;
  text: string;
  dialogOpened: boolean;
};

export const ComposeEffect = StateEffect.define<Partial<StateValue>>();

export const ComposeState = StateField.define<StateValue>({
  create() {
    return {
      prompt: '',
      text: '',
      dialogOpened: false,
    };
  },
  update(previousValue, tr) {
    const composeEffect = tr.effects.find((e) => e.is(ComposeEffect));
    if (tr.state.doc) {
      if (composeEffect) {
        // There is some changes to the compose state, so update it.
        return {
          ...previousValue,
          ...composeEffect.value,
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
