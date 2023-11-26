import {LMAttachmentMetaUI} from '../../LikeMinds-ReactNative-Feed-UI';
import {getAWS} from './AWSConfig';

// this function converts the image/video url to blob
function uriToBlob(uri: string): Promise<Blob> {
  return new Promise((resolve, reject) => {
    const xhr = new XMLHttpRequest();
    // If successful -> return with blob
    xhr.onload = function () {
      resolve(xhr.response);
    };
    // reject on error
    xhr.onerror = function () {
      reject(new Error('uriToBlob failed'));
    };
    // Set the response type to 'blob' - this means the server's response
    // will be accessed as a binary object
    xhr.responseType = 'blob';
    // Initialize the request. The third argument set to 'true' denotes
    // that the request is asynchronous
    xhr.open('GET', uri, true);

    // Send the request. The 'null' argument means that no body content is given for the request
    xhr.send(null);
  });
}

// this function uploads the media on AWS S3 bucket
export const uploadFilesToAWS = async (
  media: LMAttachmentMetaUI,
  userUniqueId: string,
) => {
  const blob = await uriToBlob(media.url ? media.url : '');
  const mediaObject = getAWS()
    .upload({
      Key: `files/post/${userUniqueId}/${media.name}`,
      Bucket: `${process.env.S3_BUCKET}`,
      Body: blob,
      ACL: 'public-read-write',
      ContentType: media.format,
    })
    .on('httpUploadProgress', function (progress) {
      Math.round((progress.loaded / progress.total) * 100);
    });
  return mediaObject.promise();
};
