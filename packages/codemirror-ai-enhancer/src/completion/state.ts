import { StateEffect, Text, StateField } from '@codemirror/state';

export const CompletionEffect = StateEffect.define<{
  text: string | null;
  doc: Text;
}>();

export const CompletionState = StateField.define<{ suggestion: null | string }>(
  {
    create() {
      return { suggestion: null };
    },
    update(previousValue, tr) {
      const completionEffect = tr.effects.find((e) => e.is(CompletionEffect));
      if (tr.state.doc) {
        if (completionEffect && tr.state.doc === completionEffect.value.doc) {
          // There is a new selection that has been set via an effect,
          // and it applies to the current document.
          return { suggestion: completionEffect.value.text };
        } else if (!tr.docChanged && !tr.selection) {
          // This transaction is irrelevant to the document state
          // and could be generate by another plugin, so keep
          // the previous value.
          return previousValue;
        }
      }
      return this.create(tr.state);
    },
  }
);
