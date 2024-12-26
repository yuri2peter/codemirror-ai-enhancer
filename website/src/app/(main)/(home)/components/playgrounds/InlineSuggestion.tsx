import { Badge } from '@/components/ui/badge';
import MarkdownCodemirror from '../MarkdownCodemirror';

export default function InlineSuggestion() {
  return (
    <div className="space-y-4">
      <div className="text-muted-foreground">
        Press <Badge>⌘ + J</Badge> to trigger inline suggestion,{' '}
        <Badge>Tab</Badge> to accept.
      </div>
      <MarkdownCodemirror value={'One plus two equals '} />
    </div>
  );
}
