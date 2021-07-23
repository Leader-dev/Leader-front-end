import axios from "@/utils/request";

export const respondToOrgApplication = async ({
  applicationId,
  orgId,
  result,
}: {
  applicationId: string;
  orgId: string;
  result: "pass" | "reject";
}) => {
  await axios.post(`/org/manage/apply/send-result?orgId=${orgId}`, {
    applicationId,
    result,
  });
};
