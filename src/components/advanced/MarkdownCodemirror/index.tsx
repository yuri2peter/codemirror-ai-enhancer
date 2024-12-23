import './styles.css';
import CodeMirror, { EditorView } from '@uiw/react-codemirror';
import { vscodeDark } from '@uiw/codemirror-theme-vscode';
import { loadLanguage } from '@uiw/codemirror-extensions-langs';
import { aiEnhancer, EnhancerConfig } from './extensions/enhancer';

export default function MarkdownCodemirror({
  value,
  className,
  aiEnhancerConfig,
}: {
  value: string;
  className?: string;
  aiEnhancerConfig?: EnhancerConfig;
}) {
  return (
    <CodeMirror
      value={value}
      className={className}
      extensions={[
        vscodeDark,
        EditorView.lineWrapping,
        loadLanguage('markdown')!,
        aiEnhancerConfig ? aiEnhancer(aiEnhancerConfig) : [],
      ]}
    />
  );
}
