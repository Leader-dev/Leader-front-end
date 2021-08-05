import axios from "@/utils/request";
import useSWR from "swr";

interface GetOrgPublicInfoResult {
  name: string;
  address: string;
  instituteName: string;
  introduction: string;
  phone: string[];
  email: string[];
  typeAliases: string[];
  posterUrl: string;
}

export const getOrgPublicInfo = async ({ orgId }: { orgId: string }) => {
  return (await axios.post(`/org/manage/public-info/get?orgId=${orgId}`)).data
    .publicInfo as GetOrgPublicInfoResult;
};

export const useOrgPublicInfo = ({ orgId }: { orgId: string }) => {
  return useSWR(`/org/manage/public-info/get?orgId=${orgId}`, (a) =>
    axios(a).then((res) => res.data.publicInfo as GetOrgPublicInfoResult)
  );
};
