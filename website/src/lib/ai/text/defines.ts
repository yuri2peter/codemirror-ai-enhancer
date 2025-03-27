import { z } from 'zod';

export const DialoguesSchema = z.array(
  z.object({
    user: z.string(),
    assistant: z.string(),
  })
);
export type Dialogues = z.infer<typeof DialoguesSchema>;

// [{ role: 'system', content: 'You are a helpful assistant.' }]
export const ChatMessagesSchema = z.array(
  z.object({
    role: z.enum(['user', 'assistant', 'system']),
    content: z.string(),
  })
);

export type ChatMessages = z.infer<typeof ChatMessagesSchema>;

export type GenerateTextStream = (params: {
  prompt: string;
  chatHistory?: ChatMessages;
  onUpdate?: (completeText: string, chunkText: string) => void;
}) => Promise<string>;

// systemPrompt: You must reply with a JSON object, do not explain.
export type GenerateJson = (params: {
  prompt: string;
  chatHistory?: ChatMessages;
}) => Promise<object>;

export interface TextGenerateService {
  generateTextStream: GenerateTextStream;
  generateJson: GenerateJson;
}
