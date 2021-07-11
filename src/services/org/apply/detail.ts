import axios from "@/utils/request";
import { OrgInfo } from "@/types/organization";

interface GetApplicationDetailResult {
  id: string;
  orgId: string;
  orgInfo: OrgInfo;
  sendDate: number;
  status: string;
  applicationForm: ApplicationForm;
  departmentId: string;
  departmentInfo: {
    id: string;
    name: string;
  };
  notifications: Array<{
    id: string;
    applicationId: string;
    title: string;
    content: string;
    imgUrls: string[];
    unread: boolean;
    sendDate: number;
  }>;
}

export const getApplicationDetail = async (applicationId: string) => {
  return (await axios.post("/org/apply/detail", { applicationId })).data
    .detail as GetApplicationDetailResult;
};
