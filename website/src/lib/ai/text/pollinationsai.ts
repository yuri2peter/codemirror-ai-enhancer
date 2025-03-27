// https://www.npmjs.com/package/pollinationsai
import { createTextService, StreamEvent } from 'pollinationsai';
import {
  TextGenerateService,
  GenerateJson,
  GenerateTextStream,
} from './defines';
import { parseJsonContent } from './utils';

const generatePollinationsAITextStream: GenerateTextStream = async ({
  prompt,
  chatHistory = [],
  onUpdate = () => {},
}) => {
  const service = createTextService();
  let completeText = '';
  const onStreamData = (event: StreamEvent) => {
    const chunkText = event.choices[0]?.delta.content || '';
    completeText += chunkText;
    onUpdate(completeText, chunkText);
  };
  const stream = await service.postGenerate(
    {
      model: 'openai-large',
      messages: [...chatHistory, { role: 'user', content: prompt }],
    },
    { stream: true, onStreamData }
  );
  return new Promise((resolve, reject) => {
    stream.on('end', () => resolve(completeText));
    stream.on('error', reject);
  });
};

const generatePollinationsAIJsonReply: GenerateJson = async ({
  prompt,
  chatHistory = [],
}) => {
  const service = createTextService();
  const reply = await service.postGenerate({
    model: 'openai-large',
    messages: [...chatHistory, { role: 'user', content: prompt }],
    jsonMode: true,
  });
  return parseJsonContent(reply) as object;
};

export const pollinationsaiTextGenerateService: TextGenerateService = {
  generateTextStream: generatePollinationsAITextStream,
  generateJson: generatePollinationsAIJsonReply,
};
