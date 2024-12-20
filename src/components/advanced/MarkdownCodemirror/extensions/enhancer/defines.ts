export type EnhancerConfig = {
  fetchFn: (prompt: string) => {
    onChange: (fn: (text: string) => void) => void;
    onDone: (fn: () => void) => void;
    abort: () => void;
  };
};
