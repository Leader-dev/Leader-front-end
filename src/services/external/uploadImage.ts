import axios from "@/utils/request";
import { getImageUploadURL } from "../service/image/getUploadUrl";

export const uploadImage = async (file: File) => {
  const url = await getImageUploadURL();
  const k = axios.put(url, file, {
    headers: { "Content-Type": "" },
    codeHandlers: {},
  });
  const shortUrl = url.match(/(v1_[A-Za-z0-9]+)\?/)![1];
  await k;
  return shortUrl;
};
