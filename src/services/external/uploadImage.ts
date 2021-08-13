import axios from "@/utils/request";
import imageCompression from "browser-image-compression";
import { getImageUploadURL } from "../service/image/getUploadUrl";
import { getMultipleImageUploadURL } from "../service/image/getUploadUrlMultiple";

const fullToShort = (url: string) => {
  return url.match(/(v1_[A-Za-z0-9]+)\?/)![1];
};

const options: Parameters<typeof imageCompression>[1] = {
  maxSizeMB: 1,
};

/** Upload file
 * @example const file = new File([blob], "image.jpg");
 */
export const uploadImage = async (file: File) => {
  const url = await getImageUploadURL();
  console.log(url);
  const image = await imageCompression(file, options);
  const k = axios.put(url, image, {
    headers: { "Content-Type": "" },
    codeHandlers: {},
  });
  const shortUrl = fullToShort(url);
  await k;
  return shortUrl;
};

export const uploadImageList = async (images: File[]) => {
  const urls = await getMultipleImageUploadURL({ count: images.length });
  const reqs = (
    await Promise.all(images.map((image) => imageCompression(image, options)))
  ).map((image, i) => {
    return axios.put(urls[i], image, { headers: { "Content-Type": "" } });
  });
  await Promise.all(reqs);
  return urls.map(fullToShort);
};
