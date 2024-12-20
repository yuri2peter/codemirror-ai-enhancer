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
      const inlineSuggestion = tr.effects.find((e) => e.is(CompletionEffect));
      if (tr.state.doc) {
        if (inlineSuggestion && tr.state.doc === inlineSuggestion.value.doc) {
          // There is a new selection that has been set via an effect,
          // and it applies to the current document.
          return { suggestion: inlineSuggestion.value.text };
        } else if (!tr.docChanged && !tr.selection) {
          // This transaction is irrelevant to the document state
          // and could be generate by another plugin, so keep
          // the previous value.
          return previousValue;
        }
      }
      return { suggestion: null };
    },
  }
);
