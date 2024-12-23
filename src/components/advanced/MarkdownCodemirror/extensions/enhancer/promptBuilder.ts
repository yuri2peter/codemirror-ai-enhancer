export function buildInsertPrompt({
  prefix,
  suffix,
  command,
}: {
  prefix: string;
  suffix: string;
  command: string;
}) {
  return `
You are an AI writing assistant. You should insert new content at <CURRENTCURSOR/> in the document (USERDOCUMENT) according to the USERCOMMAND.
Insert content at the cursor position only, do not change other text.

<USERDOCUMENT>${prefix}<CURRENTCURSOR/>${suffix}</USERDOCUMENT>

USERCOMMAND: ${command}

Out put the inserted content only, do not explain.
`;
}

export function buildRewritePrompt({
  prefix,
  suffix,
  selection,
  command,
}: {
  prefix: string;
  suffix: string;
  selection: string;
  command: string;
}) {
  return `
You are an AI writing assistant. You should rewrite the user selected content (USERSELECTION) in the document (USERDOCUMENT) according to the USERCOMMAND.
Rewrite selected text only, do not change other text.

<USERDOCUMENT>${prefix}<USERSELECTION>${selection}</USERSELECTION>${suffix}</USERDOCUMENT>

USERCOMMAND: ${command}

Out put the rewritten content only, do not explain.
`;
}

export function buildAssistantPrompt({
  prefix,
  suffix,
  selection,
  command,
}: {
  prefix: string;
  suffix: string;
  selection: string;
  command: string;
}) {
  return `
You are a helpful assistant. You should answer the user question (USERQUESTION), use the USERDOCUMENT as context if needed.

<USERDOCUMENT>${prefix}<USERSELECTION>${selection}</USERSELECTION>${suffix}</USERDOCUMENT>

USERQUESTION: ${command}

Out put the answer only.
`;
}
