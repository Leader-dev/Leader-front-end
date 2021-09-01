import axios from "@/utils/request";
import { mutate } from "swr";

type SetMembersProps = {
  memberIds: string[];
  orgId: string;
  departmentId?: string;
};

export const setMembers = async ({
  memberIds,
  orgId,
  departmentId,
}: SetMembersProps) => {
  await axios.post(`/org/manage/structure/set-member?orgId=${orgId}`, {
    memberIds,
    departmentId,
  });
  await mutate([
    `/org/manage/structure/list-members?orgId=${orgId}`,
    departmentId,
  ]);
};
