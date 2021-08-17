import axios from "@/utils/request";
import { uploadImageList } from "../external/uploadImage";

export const reportPostItem = async ({
  trendItemId,
  description,
  images,
}: {
  trendItemId: string;
  description: string;
  images: File[];
}) => {
  const imageUrls = await uploadImageList(images);
  await axios.post("/trend/report", { trendItemId, description, imageUrls });
};
