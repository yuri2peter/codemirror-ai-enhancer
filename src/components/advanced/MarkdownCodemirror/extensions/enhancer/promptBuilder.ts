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
You are an AI writing assistant. You should add new content according to the user given command.
You must reply the generated content directly.
You should not use other XML tags in response unless they are parts of the generated content.
You must only reply the generated content to insert, do not repeat the current content in response.
You should not provide any additional comments in response.
You should ensure the indentation of generated content matches the given document.

The current file content is provided enclosed in <USERDOCUMENT></USERDOCUMENT> XML tags.
The current cursor position is presented using <CURRENTCURSOR/> XML tags.
You must not repeat the current content in your response.

<USERDOCUMENT>${prefix}<CURRENTCURSOR/>${suffix}</USERDOCUMENT>
<USERCOMMAND>${command}</USERCOMMAND>`;
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
You are an AI writing assistant. You should rewrite the user selected content according to the user given command.
You must reply the generated content directly.
You should not use other XML tags in response unless they are parts of the generated content.
You must only reply the generated content to insert, do not repeat the current content in response.
You should not provide any additional comments in response.
You should ensure the indentation of generated content matches the given document.

The current file content is provided enclosed in <USERDOCUMENT></USERDOCUMENT> XML tags.
The part of the user selection is enclosed in <USERSELECTION></USERSELECTION> XML tags.
You must not repeat the current content in your response.

<USERDOCUMENT>${prefix}<USERSELECTION>${selection}</USERSELECTION>${suffix}</USERDOCUMENT>
<USERCOMMAND>${command}</USERCOMMAND>`;
}
