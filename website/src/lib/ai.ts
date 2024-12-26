// https://platform.openai.com/docs/quickstart
import OpenAI from 'openai';
import { z } from 'zod';
import { ChatCompletionMessageParam } from 'openai/resources/chat/completions';

const OPENAI_API_KEY = process.env.OPENAI_API_KEY;
const OPENAI_BASE_URL = process.env.OPENAI_BASE_URL;
const OPENAI_MODEL = process.env.OPENAI_MODEL;

export const ChatHistorySchema = z.array(
  z.object({
    user: z.string(),
    model: z.string(),
  })
);
export type ChatHistory = z.infer<typeof ChatHistorySchema>;
export type GenerateContent = (
  prompt: string,
  history?: ChatHistory
) => Promise<string>;
export type GenerateContentStream = (
  prompt: string,
  history: ChatHistory | undefined,
  onUpdate: (totalText: string, chunkText: string) => void
) => Promise<string>;

export async function getAi() {
  const openai = new OpenAI({
    apiKey: OPENAI_API_KEY,
    baseURL: OPENAI_BASE_URL || undefined,
  });
  return openai;
}

export async function getAiModel() {
  return OPENAI_MODEL || 'gpt-4o';
}

export const generateOpenaiContent: GenerateContent = async (
  prompt: string,
  history: ChatHistory = []
) => {
  const openai = await getAi();
  const completion = await openai.chat.completions.create({
    model: await getAiModel(),
    messages: [
      { role: 'system', content: 'You are a helpful assistant.' },
      ...historyTostartChatParams(history),
      {
        role: 'user',
        content: prompt,
      },
    ],
  });
  return completion.choices[0]!.message.content!;
};

export const generateOpenaiContentStream: GenerateContentStream = async (
  prompt: string,
  history: ChatHistory = [],
  onUpdate: (totalText: string, chunkText: string) => void
) => {
  const openai = await getAi();
  const stream = await openai.chat.completions.create({
    model: await getAiModel(),
    stream: true,
    messages: [
      { role: 'system', content: 'You are a helpful assistant.' },
      ...historyTostartChatParams(history),
      {
        role: 'user',
        content: prompt,
      },
    ],
  });
  let str = '';
  for await (const chunk of stream) {
    const chunkText = chunk.choices[0]?.delta?.content || '';
    str += chunkText;
    onUpdate(str, chunkText);
  }
  return str;
};

export const generateOpenaiContentStreamWithSystemPrompt = async (
  system: string,
  user: string,
  onUpdate: (completeText: string, chunkText: string) => void
) => {
  const openai = await getAi();
  const stream = await openai.chat.completions.create({
    model: await getAiModel(),
    stream: true,
    messages: [
      { role: 'system', content: system },
      {
        role: 'user',
        content: user,
      },
    ],
  });
  let str = '';
  for await (const chunk of stream) {
    const chunkText = chunk.choices[0]?.delta?.content || '';
    str += chunkText;
    onUpdate(str, chunkText);
  }
  return str;
};

export async function generateOpenaiJsonReply({
  system,
  user,
}: {
  system: string;
  user: string;
}) {
  const ai = await getAi();
  const model = await getAiModel();
  const completion = await ai.chat.completions.create({
    model,
    response_format: { type: 'json_object' },
    messages: [
      {
        role: 'system',
        content:
          system + '\n\nYou must reply with a JSON object, do not explain.',
      },
      { role: 'user', content: user },
    ],
  });
  const content = completion.choices[0]!.message.content!;
  const json = /\{[\s\S]*\}/.exec(content)?.[0];
  if (!json) {
    console.error('No JSON found in the response: ', content);
    throw new Error('No JSON found in the response.');
  }
  return JSON.parse(json);
}

function historyTostartChatParams(
  history: ChatHistory
): ChatCompletionMessageParam[] {
  const historyFixed: {
    role: 'user' | 'assistant';
    content: string;
  }[] = [];
  history.forEach((h) => {
    historyFixed.push({
      role: 'user',
      content: h.user,
    });
    historyFixed.push({
      role: 'assistant',
      content: h.model,
    });
  });
  return historyFixed;
}
