export type PromptParams = {
  prefix: string;
  suffix: string;
  selection: string;
  command: string;
};

export type TextChangeHandler = (text: string) => void;

export type CompletionParams = PromptParams & {
  onTextChange: TextChangeHandler;
};

export type EnhancerConfig = {
  insert: (params: CompletionParams) => void;
  rewrite: (params: CompletionParams) => void;
  assist: (params: CompletionParams) => void;
};
