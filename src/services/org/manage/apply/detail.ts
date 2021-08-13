import { Timestamp, UserOverview } from "@/types/organization";
import axios from "@/utils/request";
import useSWR from "swr";
import { ApplicationForm } from "@/types/organization";
import { NotificationOverview } from "@/types/recruit";
import { MemberInfoOverview } from "@/types/organization";

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
  notifications: NotificationOverview[];
  operateMemberId: string | null;
  operateMemberInfo: MemberInfoOverview | null;
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
