import axios from "@/utils/request";
import { mutate } from "swr";
import { MemberInfo } from "@/types/organization";

export const setOrgMemberInfo = async ({
  memberInfo,
  orgId,
}: {
  memberInfo: MemberInfo;
  orgId: string;
}) => {
  await axios.post(`/org/manage/member-info/set?orgId=${orgId}`, {
    memberInfo,
  });
  await mutate(`/org/manage/member-info/get?orgId=${orgId}`);
};
