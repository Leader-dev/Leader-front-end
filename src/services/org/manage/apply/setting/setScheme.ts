import axios from "@/utils/request";
import { OrgRecruitSetting } from "@/types/recruit";

export const setOrgRecruitSetting = async ({
  orgId,
  scheme,
  resetReceivedApplicationCount,
}: {
  orgId: string;
  scheme: OrgRecruitSetting;
  resetReceivedApplicationCount: boolean;
}) => {
  await axios.post(`/org/manage/apply/send-result?orgId=${orgId}`, {
    scheme,
    resetReceivedApplicationCount,
  });
};
