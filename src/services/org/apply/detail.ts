import axios from "@/utils/request";
import { ApplicationForm, OrgInfo } from "@/types/organization";
import useSWR from "swr";

interface GetApplicationDetailResult {
  id: string;
  orgId: string;
  orgInfo: OrgInfo;
  sendDate: number;
  status: "pending" | "passed" | "rejected" | "accepted" | "declined";
  applicationForm: ApplicationForm;
  departmentId: string;
  departmentInfo: {
    id: string;
    name: string;
  };
  notifications: Array<{
    id: string;
    title: string;
    unread: boolean;
    sendDate: number;
  }>;
}

export const getApplicationDetail = async (applicationId: string) => {
  return (await axios.post("/org/apply/detail", { applicationId })).data
    .detail as GetApplicationDetailResult;
};

export const useApplicationDetail = (applicationId: string) => {
  return useSWR(["/org/apply/detail", applicationId], (url, applicationId) =>
    axios(url, { data: { applicationId }, codeHandlers: {} }).then(
      (res) => res.data.detail as GetApplicationDetailResult
    )
  );
};
