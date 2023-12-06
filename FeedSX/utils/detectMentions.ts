// this function detect the mentions in a string according to the position of '@'
export function detectMentions(input: string) {
  const mentionRegex = /(?:^|\s)@(\w+)/g;
  const matches = [];
  let match;

  while ((match = mentionRegex.exec(input)) !== null) {
    const endIndex = mentionRegex.lastIndex;
    const nextChar = input.charAt(endIndex);

    if (nextChar !== '@') {
      matches.push(match[1]);
    }
  }

  const myArray = input.split(' ');
  const doesExists = myArray.includes('@');

  /* It basically checks that for the below four conditions:
     1. if '@' is at end preceded by a whitespace
     2. if input only contains '@'
     3. if '@' occurs at new line
     4. doesExists checks whether '@' has been typed between two strings
     If any of the above condition is true, it pushes it in the matches list which indicates that member list has to be shown
    */

  if (
    input.endsWith(' @') ||
    input === '@' ||
    input.endsWith('\n@') ||
    (doesExists && !input.endsWith(' '))
  ) {
    matches.push('');
  }

  return matches;
}
