import axios from "@/utils/request";
import { uploadImageList } from "../external/uploadImage";

type SendTrendPostParams = {
  orgId: string;
  anonymous: boolean;
  content: string;
  images: File[];
};

export const sendTrendPost = async ({
  orgId,
  anonymous,
  content,
  images,
}: SendTrendPostParams) => {
  const imageUrls = await uploadImageList(images);
  await axios.post("/trend/send", { orgId, anonymous, content, imageUrls });
};
