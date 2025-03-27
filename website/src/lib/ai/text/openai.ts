// https://platform.openai.com/docs/quickstart
import OpenAI from 'openai';
import {
  TextGenerateService,
  GenerateJson,
  GenerateTextStream,
} from './defines';
import { parseJsonContent } from './utils';

const OPENAI_API_KEY = process.env.OPENAI_API_KEY;
const OPENAI_BASE_URL = process.env.OPENAI_BASE_URL;
const OPENAI_MODEL = process.env.OPENAI_MODEL;

async function getService() {
  const openai = new OpenAI({
    apiKey: OPENAI_API_KEY,
    baseURL: OPENAI_BASE_URL || undefined,
  });
  return openai;
}

async function getModel() {
  return OPENAI_MODEL || 'gpt-4o';
}

const generateOpenaiTextStream: GenerateTextStream = async ({
  prompt,
  chatHistory = [],
  onUpdate = () => {},
}) => {
  const openai = await getService();
  const stream = await openai.chat.completions.create({
    model: await getModel(),
    stream: true,
    messages: [
      ...chatHistory,
      {
        role: 'user',
        content: prompt,
      },
    ],
  });
  let completeText = '';
  for await (const chunk of stream) {
    const chunkText = chunk.choices[0]?.delta?.content || '';
    completeText += chunkText;
    onUpdate(completeText, chunkText);
  }
  return completeText;
};

const generateOpenaiJsonReply: GenerateJson = async ({
  prompt,
  chatHistory = [],
}) => {
  const ai = await getService();
  const model = await getModel();
  const completion = await ai.chat.completions.create({
    model,
    response_format: { type: 'json_object' },
    messages: [
      {
        role: 'system',
        content: '\n\nYou must reply with a JSON object, do not explain.',
      },
      ...chatHistory,
      { role: 'user', content: prompt },
    ],
  });
  const content = completion.choices[0]!.message.content!;
  return parseJsonContent(content) as object;
};

export const openaiTextGenerateService: TextGenerateService = {
  generateTextStream: generateOpenaiTextStream,
  generateJson: generateOpenaiJsonReply,
};
