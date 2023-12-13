import {extractPathfromRouteQuery} from './extractMentionPath';
import {replaceMentionValues} from './replaceMentionValues';

export const mentionToRouteConverter = (content: string) => {
  return replaceMentionValues(content, ({id, name}) => {
    const PATH = extractPathfromRouteQuery(id);
    if (!PATH) {
      return `<<${name}|route://${name}>>`;
    } else {
      return `<<${name}|route://${id}>>`;
    }
  });
};
