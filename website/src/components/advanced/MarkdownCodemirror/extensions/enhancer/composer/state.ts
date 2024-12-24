import { StateEffect, StateField } from '@codemirror/state';

export type StateValue = {
  text: string;
  dialogOpened: boolean;
};

export const ComposerEffect = StateEffect.define<Partial<StateValue>>();

export const ComposerState = StateField.define<StateValue>({
  create() {
    return {
      prompt: '',
      text: '',
      dialogOpened: false,
    };
  },
  update(previousValue, tr) {
    const composerEffect = tr.effects.find((e) => e.is(ComposerEffect));
    if (tr.state.doc) {
      if (composerEffect) {
        // There is some changes to the composer state, so update it.
        return {
          ...previousValue,
          ...composerEffect.value,
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
