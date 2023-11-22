import {launchImageLibrary} from 'react-native-image-picker';
import DocumentPicker from 'react-native-document-picker';

//select Images and videoes From Gallery
export const selectImageVideo = async (type: string) => {
  const options = {
    mediaType: type,
    selectionLimit: 0,
  };
  return await launchImageLibrary(options as any, async (response: any) => {
    if (response?.didCancel) {
      // process cancel
    }
    const selectedImages = response?.assets; // selectedImages can be anything images or videos or both

    if (selectedImages) {
      return;
    }
  });
};

//select Documents From Gallery
export const selectDocument = async () => {
  try {
    const response = await DocumentPicker.pick({
      type: [DocumentPicker.types.pdf],
      allowMultiSelection: true,
    });
    const selectedDocs: any = response; // selectedImages can be anything images or videos or both
    const docsArrlength = selectedDocs?.length;
    if (docsArrlength > 0) {
      if (selectedDocs) {
        return selectedDocs;
      }
    }
  } catch (error) {
    // process error
  }
};
