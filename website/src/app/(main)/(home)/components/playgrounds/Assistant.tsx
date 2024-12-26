import { Badge } from '@/components/ui/badge';
import MarkdownCodemirror from '../MarkdownCodemirror';
import { Copy } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';

export default function Assistant() {
  return (
    <div className="space-y-4">
      <div className="text-muted-foreground">
        Press <Badge>⌘ + L</Badge> to trigger assistant mode. You can ask AI
        questions based on the content.
      </div>
      <div className="text-muted-foreground">
        Try this commad:
        <Button
          className="text-foreground"
          variant={'outline'}
          onClick={() => {
            navigator.clipboard.writeText('What is the story about?');
            toast.success('Copied to clipboard');
          }}
        >
          What is the story about?
          <Copy className="w-4 h-4 ml-2" />
        </Button>
      </div>
      <MarkdownCodemirror
        value={`    Long ago, in a distant land, there was a quaint village situated between gentle hills and a shimmering river. The villagers were famous for their generosity and warmth.

    One day, a mysterious traveler arrived, bringing with him tales of adventure and magic. The children gathered around him, eager to hear his stories. As the sun set, the village square was filled with laughter and wonder, and the traveler knew he had found a place to call home.`}
      />
    </div>
  );
}
