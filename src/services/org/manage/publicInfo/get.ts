import axios from "@/utils/request";
import useSWR from "swr";
import { OrgPublicInfo } from "@/types/organization";

export const getOrgPublicInfo = async ({ orgId }: { orgId: string }) => {
  return (await axios.post(`/org/manage/public-info/get?orgId=${orgId}`)).data
    .publicInfo as OrgPublicInfo;
};

export const useOrgPublicInfo = ({ orgId }: { orgId: string }) => {
  return useSWR(`/org/manage/public-info/get?orgId=${orgId}`, (a) =>
    axios(a).then((res) => res.data.publicInfo as OrgPublicInfo)
  );
};
