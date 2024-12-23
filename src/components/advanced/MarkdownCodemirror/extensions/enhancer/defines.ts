export type EnhancerConfig = {
  completion: (prompt: string) => {
    onChange: (fn: (text: string) => void) => void;
    onDone: (fn: () => void) => void;
    abort: () => void;
  };
  buildInsertPrompt?: (params: {
    prefix: string;
    suffix: string;
    command: string;
  }) => string;
  buildRewritePrompt?: (params: {
    prefix: string;
    suffix: string;
    selection: string;
    command: string;
  }) => string;
};
