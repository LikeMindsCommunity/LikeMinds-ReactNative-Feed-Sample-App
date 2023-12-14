import {timeStamp} from './timeStamp';
import {nameInitials} from './nameInitials';
import {requestStoragePermission} from './permissions';
import {postShare} from './postShare';
import {getAWS} from './AWSConfig';
import {uploadFilesToAWS} from './uploadFilesToAWS';
import {selectDocument, selectImageVideo} from './mediaSelection';
import {detectURLs} from './detectLinks';
import {replaceLastMention} from './replaceMentions';
import {detectMentions} from './detectMentions';
import {replaceMentionValues} from './replaceMentionValues';
import {extractPathfromRouteQuery} from './extractMentionPath';
import {mentionToRouteConverter} from './mentionToRouteConverter';
import {routeToMentionConverter} from './routeToMentionConverter';

export {
  timeStamp,
  nameInitials,
  requestStoragePermission,
  postShare,
  getAWS,
  uploadFilesToAWS,
  selectDocument,
  selectImageVideo,
  detectURLs,
  replaceLastMention,
  detectMentions,
  replaceMentionValues,
  extractPathfromRouteQuery,
  mentionToRouteConverter,
  routeToMentionConverter,
};
