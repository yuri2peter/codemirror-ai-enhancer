import styles from './styles.module.css';
import CodeMirror, { EditorView } from '@uiw/react-codemirror';
import { keymap } from '@codemirror/view';
import { defaultKeymap, indentWithTab } from '@codemirror/commands';
import { vscodeDark, vscodeLight } from '@uiw/codemirror-theme-vscode';
import { loadLanguage } from '@uiw/codemirror-extensions-langs';
import { basicSetup } from '@uiw/codemirror-extensions-basic-setup';
import { cn } from '@/lib/utils';
import { useMemo, useRef } from 'react';
import { debounce } from 'radash';
import { useTheme } from 'next-themes';
import { aiEnhancer } from './extensions/enhancer';

export default function MarkdownCodemirror({
  value,
  onChange,
  className,
  onChangeDebounceDelay = 0,
}: {
  value: string;
  onChange?: (value: string) => void;
  className?: string;
  onChangeDebounceDelay?: number;
}) {
  const refOnChange = useRef(onChange);
  refOnChange.current = onChange;
  const handleChangeFixed = useMemo(() => {
    const delay = onChangeDebounceDelay ?? 0;
    const handleChange = (text: string) => {
      refOnChange.current?.(text);
    };
    return delay > 0 ? debounce({ delay }, handleChange) : handleChange;
  }, [onChangeDebounceDelay]);
  const { theme } = useTheme();

  return (
    <CodeMirror
      value={value}
      onChange={handleChangeFixed}
      className={cn(styles.editor, className)}
      extensions={[
        basicSetup({
          foldGutter: false,
          dropCursor: true,
          allowMultipleSelections: false,
          indentOnInput: true,
        }),
        EditorView.lineWrapping,
        keymap.of(defaultKeymap.concat(indentWithTab)),
        theme === 'dark' ? vscodeDark : vscodeLight,
        loadLanguage('markdown')!,
        aiEnhancer(),
      ]}
    />
  );
}
