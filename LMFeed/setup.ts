import {LMFeedClient} from '@likeminds.community/feed-js';

export const initMyClient = (apiKey: string) => {
  const lmFeedClient = LMFeedClient.Builder()
    .setApiKey(apiKey)
    .setPlatformCode('rn')
    .setVersionCode(3)
    .build();

  return lmFeedClient;
};
