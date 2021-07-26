import { ImagePicker } from "@ionic-native/image-picker";

function getBlob(
  b64Data: string,
  contentType: string,
  sliceSize: number = 512
) {
  contentType = contentType || "";
  sliceSize = sliceSize || 512;
  let byteCharacters = atob(b64Data);
  let byteArrays = [];

  for (let offset = 0; offset < byteCharacters.length; offset += sliceSize) {
    let slice = byteCharacters.slice(offset, offset + sliceSize);
    let byteNumbers = new Array(slice.length);
    for (let i = 0; i < slice.length; i++) {
      byteNumbers[i] = slice.charCodeAt(i);
    }
    let byteArray = new Uint8Array(byteNumbers);
    byteArrays.push(byteArray);
  }
  return new Blob(byteArrays, { type: contentType });
}
export const promptSelectImages = async (count: number = 1) => {
  const data: Array<string> = await ImagePicker.getPictures({
    maximumImagesCount: count,
    outputType: 1,
    quality: 100,
  });

  return data.map((b64) => getBlob(b64, ".jpg"));
};
