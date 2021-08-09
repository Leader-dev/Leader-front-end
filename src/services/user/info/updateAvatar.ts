import { uploadImage } from "@/services/external/uploadImage";
import axios from "@/utils/request";
import { mutate } from "swr";

export const updateUserPortrait = async (img: File) => {
  const avatarUrl = await uploadImage(img);
  await axios.post("/user/info/update-avatar", { avatarUrl: avatarUrl });
  await mutate("/user/info/get");
};
