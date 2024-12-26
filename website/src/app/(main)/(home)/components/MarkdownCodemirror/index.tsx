import './styles.css';
import '@yuri2/codemirror-ai-enhancer/styles.css';
import CodeMirror, { EditorView } from '@uiw/react-codemirror';
import { vscodeLight } from '@uiw/codemirror-theme-vscode';
import { loadLanguage } from '@uiw/codemirror-extensions-langs';
import { aiEnhancer } from '@yuri2/codemirror-ai-enhancer';
import { aiEnhancerConfig } from './aiEnhancerConfig';

export default function MarkdownCodemirror({
  value,
  className,
}: {
  value: string;
  className?: string;
}) {
  return (
    <CodeMirror
      value={value}
      className={className}
      extensions={[
        vscodeLight,
        EditorView.lineWrapping,
        loadLanguage('markdown')!,
        aiEnhancer(aiEnhancerConfig),
      ]}
    />
  );
}
