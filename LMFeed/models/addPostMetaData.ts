// selected image/video format interface
export interface ImageVideoMetaData {
  fileName: string;
  fileSize: number;
  height: number;
  type: string;
  uri: string;
  width: number;
  bitrate?: number;
  duration?: number;
  originalPath?: string;
}
// selected document format interface
export interface DocumentMetaData {
  name: string;
  size: number;
  fileCopyUri: null;
  type: string;
  uri: string;
}
