import { OrgApplication } from "@/types/organization";
import axios from "@/utils/request";
import useSWR from "swr";
import { MemberInfoOverview } from "@/types/organization";

interface OperatedApplication extends OrgApplication {
  operateMemberId: string;
  operateMemberInfo: MemberInfoOverview;
}

export const useOrgOperatedApplications = ({ orgId }: { orgId: string }) => {
  return useSWR(`/org/manage/apply/list-operated?orgId=${orgId}`, (d) =>
    axios(d).then((res) => res.data.list as OperatedApplication[])
  );
};
