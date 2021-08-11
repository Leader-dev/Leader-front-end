import axios from "@/utils/request";
import { mutate } from "swr";
import { uploadImage } from "@/services/external/uploadImage";

export const setOrgMemberAvatar = async ({
  avatarFile,
  orgId,
}: {
  avatarFile: File;
  orgId: string;
}) => {
  const avatarUrl = await uploadImage(avatarFile);
  await axios.post(`/org/manage/member-info/set-avatar?orgId=${orgId}`, {
    avatarUrl,
  });
  await mutate(`/org/manage/member-info/get?orgId=${orgId}`);
};
