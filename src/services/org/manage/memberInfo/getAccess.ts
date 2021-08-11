import useSWR from "swr";
import axios from "@/utils/request";

interface MemberAccessResult {
  adminPanel: boolean;
  managerFunctions: boolean;
  recruitFunctions: boolean;
  presidentFunctions: boolean;
}

export const useOrgMemberAccess = (orgId: string) => {
  return useSWR(`/org/manage/member-info/get-access?orgId=${orgId}`, (url) => {
    axios.post(url).then((res) => res.data.data as MemberAccessResult);
  });
};
