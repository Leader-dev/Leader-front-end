import { uploadImage } from "@/services/external/uploadImage";
import axios from "@/utils/request";

export const updateUserPortrait = async (img: File) => {
  const avatarUrl = await uploadImage(img);
  await axios.post("/user/info/update-avatar", { avatarUrl: avatarUrl });
};
