import MarkdownCodemirror from '@/components/advanced/MarkdownCodemirror';
import { useState } from 'react';
import exampleText from './exampleText.ts';
import { Button } from '@/components/ui/button.tsx';
import { Card } from '@/components/ui/card.tsx';
import { EnhancerConfig } from '@/components/advanced/MarkdownCodemirror/extensions/enhancer';
import OpenAI from 'openai';

export default function Home() {
  const [value, setValue] = useState(exampleText);
  return (
    <div className="w-full h-screen flex flex-col items-center justify-center">
      <Card className="space-y-4 p-4 max-w-md w-screen">
        <div>
          <Button onClick={() => setValue(exampleText)}>Reset Value</Button>
        </div>
        <MarkdownCodemirror
          value={value}
          onChange={setValue}
          className="w-full h-96 overflow-y-auto bg-gray-100"
          aiEnhancerConfig={aiEnhancerConfig()}
        />
      </Card>
    </div>
  );
}

function aiEnhancerConfig(): EnhancerConfig {
  const openai = new OpenAI({
    apiKey: import.meta.env.VITE_OPENAI_API_KEY,
    baseURL: import.meta.env.VITE_OPENAI_BASE_URL || undefined,
    dangerouslyAllowBrowser: true,
  });
  return {
    fetchFn: (prompt) => {
      let str = '';
      let handleChange: (text: string) => void = () => {};
      let handleDone: () => void = () => {};
      let handleAbort: () => void = () => {};
      const onChange = (fn: (text: string) => void) => {
        handleChange = fn;
      };
      const onDone = (fn: () => void) => {
        handleDone = fn;
      };
      const abort = () => {
        handleAbort();
      };
      const controller = new AbortController();
      const signal = controller.signal;

      openai.chat.completions
        .create(
          {
            model: 'gpt-4o-mini',
            stream: true,
            messages: [{ role: 'user', content: prompt }],
          },
          { signal }
        )
        .then(async (stream) => {
          for await (const chunk of stream) {
            const chunkText = chunk.choices[0]?.delta?.content || '';
            str += chunkText;
            handleChange(str);
          }
        })
        .catch((error) => {
          if (error.name === 'AbortError') {
            console.log('Request was aborted');
          } else {
            console.error(error);
            handleAbort();
          }
        })
        .finally(() => {
          handleDone();
        });

      handleAbort = () => {
        controller.abort();
      };

      return {
        onChange,
        onDone,
        abort,
      };
    },
  };
}
