import axios from "@/utils/request";
import { uploadImage } from "@/services/external/uploadImage";
import { mutate } from "swr";

export const setOrgPoster = async ({
  poster,
  orgId,
}: {
  poster: File;
  orgId: string;
}) => {
  const posterUrl = await uploadImage(poster);
  await axios.post(`/org/manage/public-info/set-poster?orgId=${orgId}`, {
    posterUrl,
  });
  await mutate(`/org/manage/public-info/get?orgId=${orgId}`);
};
