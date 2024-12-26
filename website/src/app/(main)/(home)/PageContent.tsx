'use client';

import { Button } from '@/components/ui/button';
import InlineSuggestion from './components/playgrounds/InlineSuggestion';
import Composer from './components/playgrounds/Composer';
import { Copy, Terminal } from 'lucide-react';
import { toast } from 'sonner';
import { GitHubLogoIcon } from '@radix-ui/react-icons';
import Assistant from './components/playgrounds/Assistant';

export default function PageContent() {
  return (
    <div className="w-full max-w-screen-sm mx-auto pt-20 pb-10">
      <div className="prose pb-8 max-w-full">
        <h1>CodeMirror AI Enhancer</h1>
        <p className="text-muted-foreground">
          A CodeMirror extension that leverages AI to perform localized text{' '}
          <b className="text-foreground">modifications</b> and{' '}
          <b className="text-foreground">continuations</b>.
        </p>
        <h2>Install</h2>
        <div className="flex items-center gap-4">
          <Button
            variant={'outline'}
            onClick={() => {
              navigator.clipboard.writeText('npm i @yuri2/codemirror-ai-enhancer');
              toast.success('Copied to clipboard');
            }}
          >
            <Terminal className="w-4 h-4 mr-2" />
            npm i @yuri2/codemirror-ai-enhancer
            <Copy className="w-4 h-4 ml-2" />
          </Button>
          <a href="https://github.com/yuri2peter/codemirror-ai-enhancer">
            <Button variant={'ringHover'}>
              <GitHubLogoIcon className="w-4 h-4 mr-2" />
              GitHub
            </Button>
          </a>
        </div>
        <h2>Playground</h2>
      </div>
      <div className="space-y-12">
        <InlineSuggestion />
        <hr />
        <Composer />
        <hr />
        <Assistant />
      </div>
    </div>
  );
}
