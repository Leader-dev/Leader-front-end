import axios from "@/utils/request";

interface OrgApplicationSetting {
  open: boolean;
  maximumApplication: number;
  appointDepartment: number;
  questions: { questions: string; required: boolean };
}

export const setOrgApplicationSetting = async ({
  orgId,
  scheme,
  resetReceivedApplicationCount,
}: {
  orgId: string;
  scheme: OrgApplicationSetting;
  resetReceivedApplicationCount: boolean;
}) => {
  await axios.post(`/org/manage/apply/send-result?orgId=${orgId}`, {
    scheme,
    resetReceivedApplicationCount,
  });
};
