import axios from "@/utils/request";
import useSWR from "swr";

interface OrgApplicationSetting {
  open: boolean;
  maximumApplication: number;
  appointDepartment: number;
  questions: { questions: string; required: boolean };
}

interface useOrgApplicationSetting {
  scheme: OrgApplicationSetting;
  receivedApplicationCount: number;
}

export const useOrgApplicationSetting = ({ orgId }: { orgId: string }) => {
  return useSWR(`/org/manage/apply/setting/get-scheme?orgId=${orgId}`, (url) =>
    axios(url).then((res) => res.data.data as useOrgApplicationSetting)
  );
};
