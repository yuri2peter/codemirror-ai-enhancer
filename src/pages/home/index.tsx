import MarkdownCodemirror from '@/components/advanced/MarkdownCodemirror';
import { useState } from 'react';
import exampleText from './exampleText.ts';
import { Button } from '@/components/ui/button.tsx';
import { Card } from '@/components/ui/card.tsx';

export default function Home() {
  const [value, setValue] = useState(exampleText);
  return (
    <div className="w-full h-screen flex flex-col items-center justify-center">
      <Card className="space-y-4 p-4">
        <div>
          <Button onClick={() => setValue(exampleText)}>Reset Value</Button>
        </div>
        <MarkdownCodemirror
          value={value}
          onChange={setValue}
          className="max-w-md min-h-96 bg-gray-100"
        />
      </Card>
    </div>
  );
}
