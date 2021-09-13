import axios from "@/utils/request";
import { mutate } from "swr";

type SetGeneralManagersProps = {
  memberIds: string[];
  orgId: string;
};

export const setGeneralManagers = async ({
  memberIds,
  orgId,
}: SetGeneralManagersProps) => {
  await axios.post(`/org/manage/structure/set-general-manager?orgId=${orgId}`, {
    memberIds,
  });
  await mutate([
    `/org/manage/structure/list-members?orgId=${orgId}`,
    undefined,
  ]);
};
