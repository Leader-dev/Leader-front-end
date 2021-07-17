import { MemberInfo } from "@/types/organization";
import axios from "@/utils/request";
import useSWR from "swr";

export const useOrgMemberInfo = ({
  orgId,
  memberId,
}: {
  orgId: string;
  memberId: string;
}) => {
  return useSWR(
    [`/org/manage/structure/member-info?orgId=${orgId}`, memberId],
    (u, d) =>
      axios
        .post(u, { memberId: d })
        .then((res) => res.data.memberInfo as MemberInfo)
  );
};
