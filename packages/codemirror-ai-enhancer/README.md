# codemirror-ai-enhancer

A CodeMirror extension that leverages AI to perform localized text modifications and continuations.

![demo.gif](./demo.gif)

[Demo](https://codemirror-ai-enhancer.yuri2.cn/)

## Features

- Guide AI to edit your content
- Customizable LLM invocation
- Customizable styles
- Shortcut key triggered

## Use Cases

- Auto-completion
- Grammar and spelling correction
- Tone adjustment
- Text length adjustment
- Answer questions based on the context

## Installation

```bash
npm i codemirror-ai-enhancer
```

## Usage

```tsx
import "codemirror-ai-enhancer/styles.css";
import CodeMirror from "@uiw/react-codemirror";
import { aiEnhancer } from "codemirror-ai-enhancer";
import { aiEnhancerConfig } from "./aiEnhancerConfig";

export default function MyCodemirror() {
  return <CodeMirror extensions={[aiEnhancer(aiEnhancerConfig)]} />;
}
```

See [aiEnhancerConfig.ts](<https://github.com/yuri2peter/codemirror-ai-enhancer/blob/main/website/src/app/(main)/(home)/components/MarkdownCodemirror/aiEnhancerConfig.ts>) for more details.

## Styles

```tsx
import "codemirror-ai-enhancer/styles.css";
```

Or, you can customize the styles by yourself.

```css
.cm-enhancer-inline-suggestion {
  opacity: 0.5;
}
.cm-enhancer-inline-answer {
  opacity: 0.5;
}
.cm-enhancer-composer-command input,
.cm-enhancer-assistant-command input {
  outline: none;
  background-color: transparent;
  opacity: 0.5;
  width: 100%;
}
```

## Local Development

In one terminal, build the library itself by running:

```bash
cd packages/codemirror-ai-enhancer
npm ci
npm run build
```

In another terminal, run the demo website:

```bash
cd website
npm ci
npm run dev
```

## Acknowledgements

Inspired by [codemirror-copilot](https://github.com/asadm/codemirror-copilot).

## License

MIT
