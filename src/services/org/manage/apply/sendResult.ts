import axios from "@/utils/request";
import { mutate } from "swr";

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
  await mutate(`/org/manage/apply/list-operated?orgId=${orgId}`);
  await mutate(`/org/manage/apply/list-received?orgId=${orgId}`);
};
