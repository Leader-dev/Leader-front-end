import axios from "@/utils/request";

export const getImageUploadURL = async () => {
  return (await axios.post("/service/image/get-upload-url")).data.url.replace(
    "http://",
    "https://"
  ) as string;
};
