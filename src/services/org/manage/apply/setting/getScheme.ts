import axios from "@/utils/request";
import useSWR from "swr";
import { useOrgRecruitSetting } from "@/types/recruit";

export const useOrgApplicationSetting = ({ orgId }: { orgId: string }) => {
  return useSWR(`/org/manage/apply/setting/get-scheme?orgId=${orgId}`, (url) =>
    axios(url).then((res) => res.data.data as useOrgRecruitSetting)
  );
};
