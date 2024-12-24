import { OpenAI } from 'openai';
import {
  TextChangeHandler,
  PromptParams,
  EnhancerConfig,
} from '@/components/advanced/MarkdownCodemirror/extensions/enhancer/defines';

function handleCompletion(prompt: string, onTextChange: TextChangeHandler) {
  const openai = new OpenAI({
    apiKey: import.meta.env.VITE_OPENAI_API_KEY,
    baseURL: import.meta.env.VITE_OPENAI_BASE_URL || undefined,
    dangerouslyAllowBrowser: true,
  });
  let str = '';
  openai.chat.completions
    .create({
      model: 'gpt-4o-mini',
      stream: true,
      messages: [{ role: 'user', content: prompt }],
    })
    .then(async (stream) => {
      for await (const chunk of stream) {
        const chunkText = chunk.choices[0]?.delta?.content || '';
        if (chunkText) {
          str += chunkText;
          onTextChange(str);
        }
      }
    })
    .catch(console.error);
}

function createInsertPrompt({ prefix, suffix, command }: PromptParams) {
  return `
You are an AI writing assistant. You should insert new content at <CURRENTCURSOR/> in the document (USERDOCUMENT) according to the USERCOMMAND.
Insert content at the cursor position only, do not change other text.

<USERDOCUMENT>${prefix}<CURRENTCURSOR/>${suffix}</USERDOCUMENT>

USERCOMMAND: ${command}

Output the inserted content only, do not explain.
`;
}

function createRewritePrompt({
  prefix,
  suffix,
  selection,
  command,
}: PromptParams) {
  return `
You are an AI writing assistant. You should rewrite the user selected content (USERSELECTION) in the document (USERDOCUMENT) according to the USERCOMMAND.
Rewrite selected text only, do not change other text.

<USERDOCUMENT>${prefix}<USERSELECTION>${selection}</USERSELECTION>${suffix}</USERDOCUMENT>

USERCOMMAND: ${command}

Output the rewritten content only, do not explain.
`;
}

function createAssistantPrompt({
  prefix,
  suffix,
  selection,
  command,
}: PromptParams) {
  return `
You are a helpful assistant. You should answer the user's question (USERQUESTION), use the USERDOCUMENT as context if needed.

<USERDOCUMENT>${prefix}<USERSELECTION>${selection}</USERSELECTION>${suffix}</USERDOCUMENT>

USERQUESTION: ${command}

Output the answer only.
`;
}

export const aiEnhancerConfig: EnhancerConfig = {
  insert: ({ onTextChange, ...promptParams }) =>
    handleCompletion(createInsertPrompt(promptParams), onTextChange),
  rewrite: ({ onTextChange, ...promptParams }) =>
    handleCompletion(createRewritePrompt(promptParams), onTextChange),
  assist: ({ onTextChange, ...promptParams }) =>
    handleCompletion(createAssistantPrompt(promptParams), onTextChange),
};
