import axios from "@/utils/request";
import useSWR from "swr";

interface OrgRecruitSetting {
  open: boolean;
  maximumApplication: number;
  appointDepartment: number;
  questions: { questions: string; required: boolean };
}

interface useOrgRecruitSetting {
  scheme: OrgRecruitSetting;
  receivedApplicationCount: number;
}

export const useOrgApplicationSetting = ({ orgId }: { orgId: string }) => {
  return useSWR(`/org/manage/apply/setting/get-scheme?orgId=${orgId}`, (url) =>
    axios(url).then((res) => res.data.data as useOrgRecruitSetting)
  );
};
