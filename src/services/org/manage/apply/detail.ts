import { Timestamp, UserOverview } from "@/types/organization";
import axios from "@/utils/request";
import useSWR from "swr";
import { ApplicationForm } from "@/types/organization";

interface UseOrgApplicationDetail {
  id: string;
  name: string;
  sendDate: Timestamp;
  status: "pending" | "accepted" | "declined";
  applicationForm: ApplicationForm;
  applicantUserId: string;
  applicantUserInfo: UserOverview;
  departmentId: string;
  departmentInfo: { id: string; name: string };
  notifications: Array<{
    id: string;
    applicantId: string;
    title: string;
    content: string;
    imageUrls: string[];
    unread: boolean;
    sendDate: Timestamp;
  }>;
}

export const useOrgApplicationDetail = ({
  orgId,
  applicationId,
}: {
  orgId: string;
  applicationId: string;
}) => {
  return useSWR(
    [`/org/manage/apply/detail?orgId=${orgId}`, applicationId],
    (a, d) => {
      return axios
        .post(a, { applicationId: d })
        .then((res) => res.data.detail as UseOrgApplicationDetail);
    }
  );
};
