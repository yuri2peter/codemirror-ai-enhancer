import { inlineCopilot } from 'codemirror-copilot';

export function copilot() {
  return inlineCopilot(async (prefix, suffix) => {
    const res = await fetch('/api/ai/chat', {
      method: 'POST',
      body: JSON.stringify({
        prompt: `You are a markdown writing assistant. Replace the <FILL_ME> placeholder with the appropriate content.
Pay close attention to spaces, line breaks, and all character details.
Output only the replacement for <FILL_ME> without any additional explanation.  

<DOC>${prefix}<FILL_ME>${suffix}</DOC>  

`,
        history: [],
        stream: false,
      }),
    });
    const { result } = await res.json();
    return result;
  });
}
