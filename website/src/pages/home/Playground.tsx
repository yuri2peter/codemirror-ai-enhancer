import MarkdownCodemirror from '@/components/advanced/MarkdownCodemirror';
import exampleText from './exampleText.ts';
import { Card } from '@/components/ui/card.tsx';
import { aiEnhancerConfig } from './aiEnhancerConfig.ts';
import '@packages/codemirror-ai-enhancer/styles.css';

export default function Playground() {
  return (
    <Card className="space-y-4 p-4 bg-zinc-800">
      <MarkdownCodemirror
        value={exampleText}
        className="w-full "
        aiEnhancerConfig={aiEnhancerConfig}
      />
    </Card>
  );
}
