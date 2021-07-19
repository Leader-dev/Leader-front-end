import { OrgApplication } from "@/types/organization";
import axios from "@/utils/request";
import useSWR from "swr";

export const useOrgReceivedApplications = ({ orgId }: { orgId: string }) => {
  return useSWR(`/org/manage/apply/list-received?orgId=${orgId}`, (d) =>
    axios(d).then((res) => res.data.list as OrgApplication[])
  );
};
