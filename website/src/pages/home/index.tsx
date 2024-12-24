import Playground from './Playground.tsx';

export default function Home() {
  return (
    <div className="w-full max-w-screen-md mx-auto pt-20 pb-10">
      <div className="prose pb-8 max-w-full">
        <h1>CodeMirror AI Enhancer</h1>
        <p>
          A CodeMirror extension that leverages AI to perform localized text{' '}
          <b>modifications</b> and <b>continuations</b>.
        </p>
        <h2>Features</h2>
        <ul>
          <li>Guide AI to edit your content</li>
          <li>Customizable LLM invocation</li>
          <li>Customizable styles</li>
          <li>Shortcut key triggered</li>
        </ul>
        <h2>Use Cases</h2>
        <ul>
          <li>Auto-completion</li>
          <li>Grammar and spelling correction</li>
          <li>Tone adjustment</li>
          <li>Text length adjustment</li>
          <li>Answer questions based on the context</li>
        </ul>
        <h2>Playground</h2>
      </div>
      <Playground />
    </div>
  );
}
