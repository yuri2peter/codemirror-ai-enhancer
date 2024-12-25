import { Badge } from '@/components/ui/badge';
import MarkdownCodemirror from '../MarkdownCodemirror';
import { Button } from '@/components/ui/button';
import { Copy } from 'lucide-react';
import { toast } from 'sonner';

export default function Composer() {
  return (
    <div className="space-y-4">
      <div className="text-muted-foreground">
        Press <Badge>⌘ + K</Badge> to trigger composer mode, <Badge>Tab</Badge>{' '}
        to accept.
      </div>
      <div className="text-muted-foreground">
        Select some text then fix grammar with this commad:
        <Button
          className="text-foreground"
          variant={'outline'}
          onClick={() => {
            navigator.clipboard.writeText('Fix errors');
            toast.success('Copied to clipboard');
          }}
        >
          Fix errors
          <Copy className="w-4 h-4 ml-2" />
        </Button>
      </div>
      <MarkdownCodemirror
        value={`The quick brown fox jumps over the lazi dog. It was a sunny day, and the fox was feeling very playful.

She walk to the store to buy some groceris. However, she forget her wallet at home and had to return.`}
      />
      <div className="text-muted-foreground">
        Continue writing with this command:
        <Button
          className="text-foreground"
          variant={'outline'}
          onClick={() => {
            navigator.clipboard.writeText('Continue, Max had a secret...');
            toast.success('Copied to clipboard');
          }}
        >
          Continue, Max had a secret...
          <Copy className="w-4 h-4 ml-2" />
        </Button>
      </div>
      <MarkdownCodemirror
        value={`Once upon a time, in a small village, there was a cute dog named Max. Max had `}
      />
    </div>
  );
}
