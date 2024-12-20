import MarkdownCodemirror from '@/components/advanced/MarkdownCodemirror';
import { useMemo, useState } from 'react';
import exampleText from './exampleText.ts';
import { Button } from '@/components/ui/button.tsx';
import { Card } from '@/components/ui/card.tsx';
import { AIStreamCallbacks } from '@/components/advanced/MarkdownCodemirror/extensions/enhancer/defines.ts';

export default function Home() {
  const [value, setValue] = useState(exampleText);
  const aiCallbacks = useMemo<AIStreamCallbacks>(() => {
    return {
      generate: async () => {
        return 'Hello, world!';
      },
      abort: () => {},
    };
  }, []);
  return (
    <div className="w-full h-screen flex flex-col items-center justify-center">
      <Card className="space-y-4 p-4">
        <div>
          <Button onClick={() => setValue(exampleText)}>Reset Value</Button>
        </div>
        <MarkdownCodemirror
          value={value}
          onChange={setValue}
          className="max-w-md h-96 overflow-y-auto bg-gray-100"
          aiCallbacks={aiCallbacks}
        />
      </Card>
    </div>
  );
}
