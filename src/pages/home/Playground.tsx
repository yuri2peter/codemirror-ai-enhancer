import MarkdownCodemirror from '@/components/advanced/MarkdownCodemirror';
import exampleText from './exampleText.ts';
import { Card } from '@/components/ui/card.tsx';
import { EnhancerConfig } from '@/components/advanced/MarkdownCodemirror/extensions/enhancer';
import OpenAI from 'openai';

export default function Playground() {
  return (
    <Card className="space-y-4 p-4 bg-zinc-800">
      <MarkdownCodemirror
        value={exampleText}
        className="w-full "
        aiEnhancerConfig={aiEnhancerConfig()}
      />
    </Card>
  );
}

function aiEnhancerConfig(): EnhancerConfig {
  const openai = new OpenAI({
    apiKey: import.meta.env.VITE_OPENAI_API_KEY,
    baseURL: import.meta.env.VITE_OPENAI_BASE_URL || undefined,
    dangerouslyAllowBrowser: true,
  });
  return {
    completion: (prompt) => {
      let str = '';
      let handleChange: (text: string) => void = () => {};
      let handleFinish: () => void = () => {};

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
              handleChange(str);
            }
          }
        })
        .catch(console.error)
        .finally(handleFinish);

      return {
        onChange: (fn) => {
          handleChange = fn;
        },
        onFinish: (fn) => {
          handleFinish = fn;
        },
      };
    },
  };
}
