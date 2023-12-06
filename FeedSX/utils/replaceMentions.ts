// this function replaces the text by mention on selecting a username from tagging list
export function replaceLastMention(
  input: string,
  taggerUserName: string,
  mentionUsername: string,
  UUID: string,
) {
  let mentionRegex: RegExp;

  if (taggerUserName === '') {
    mentionRegex = /(?<=^|\s)@(?=\s|$)/g;
  } else {
    mentionRegex = new RegExp(
      `@${taggerUserName}\\b(?!.*@${taggerUserName}\\b)`,
      'gi',
    );
  }
  const replacement = `@[${mentionUsername}](${UUID}) `;
  const replacedString = input.replace(mentionRegex, replacement);
  return replacedString;
}
