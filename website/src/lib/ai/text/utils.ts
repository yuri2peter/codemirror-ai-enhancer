import { ChatMessages, Dialogues } from './defines';

export function parseJsonContent(text: string) {
  const json = /\{[\s\S]*\}/.exec(text)?.[0];
  if (!json) {
    console.error('No JSON found in the response: ', text);
    throw new Error('No JSON found in the response.');
  }
  return JSON.parse(json);
}

export function dialoguesToChatMessages(dialogues: Dialogues): ChatMessages {
  const chatMessages: ChatMessages = [];
  dialogues.forEach((d) => {
    chatMessages.push({
      role: 'user',
      content: d.user,
    });
    chatMessages.push({
      role: 'assistant',
      content: d.assistant,
    });
  });
  return chatMessages;
}
