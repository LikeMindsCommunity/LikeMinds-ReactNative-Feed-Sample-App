import AWS from 'aws-sdk';

// aws configuration
export function getAWS() {
  AWS.config.region = process.env.AWS_REGION;
  AWS.config.credentials = new AWS.CognitoIdentityCredentials({
    IdentityPoolId: `${process.env.AWS_IDENTITY_POOL_ID}`,
  });
  const s3 = new AWS.S3({
    apiVersion: process.env.S3_API_VERSION,
    params: {Bucket: process.env.S3_BUCKET},
  });
  return s3;
}
