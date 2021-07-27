import axios from "@/utils/request";

interface OrgRecruitSetting {
  open: boolean;
  maximumApplication: number;
  appointDepartment: number;
  questions: { questions: string; required: boolean };
}

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
