import axios from "@/utils/request";
import { OrgRecruitScheme } from "@/types/recruit";
import { mutate } from "swr";

export const setOrgRecruitSetting = async ({
  orgId,
  scheme,
  resetReceivedApplicationCount,
}: {
  orgId: string;
  scheme: OrgRecruitScheme;
  resetReceivedApplicationCount: boolean;
}) => {
  await axios.post(`/org/manage/apply/setting/set-scheme?orgId=${orgId}`, {
    scheme,
    resetReceivedApplicationCount,
  });
  await mutate(`/org/manage/apply/setting/get-scheme?orgId=${orgId}`);
};
