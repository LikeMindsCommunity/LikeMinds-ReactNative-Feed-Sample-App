import {MentionData} from '../../LikeMinds-ReactNative-Feed-UI';

const mentionRegEx = /((.)\[([^[]*)]\(([^(^)]*)\))/gi;
export const replaceMentionValues = (
  value: string,
  replacer: (mention: MentionData) => string,
) =>
  value.replace(mentionRegEx, (fullMatch, original, trigger, name, id) =>
    replacer({
      original,
      trigger,
      name,
      id,
    }),
  );
