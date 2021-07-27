import axios from "@/utils/request";

export const getMultipleImageUploadURL = async ({
  count,
}: {
  count: number;
}) => {
  return (
    await axios.post("/service/image/get-upload-url-multiple", {
      urlCount: count,
    })
  ).data.urls as string[];
};
