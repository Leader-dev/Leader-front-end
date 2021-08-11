import useSWR from "swr";
import axios from "@/utils/request";
import { MemberInfo } from "@/types/organization";

export const useOrgMemberInfo = (orgId: string) => {
  return useSWR(`/org/manage/member-info/get?orgId=${orgId}`, (url) => {
    axios.post(url).then((res) => res.data.memberInfo as MemberInfo);
  });
};
