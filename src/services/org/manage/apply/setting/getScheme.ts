import axios from "@/utils/request";
import useSWR from "swr";
import { OrgRecruitSchemeInfo } from "@/types/recruit";

export const useOrgApplicationScheme = ({ orgId }: { orgId: string }) => {
  return useSWR(`/org/manage/apply/setting/get-scheme?orgId=${orgId}`, (url) =>
    axios(url).then((res) => res.data.data as OrgRecruitSchemeInfo)
  );
};
