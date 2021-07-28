import axios from "@/utils/request";
import useSWR from "swr";

interface ListOrgMembersParams {
  departmentId?: string;
  orgId: string;
}

interface OrgMember {
  id: string;
  name: string;
  title: string;
  avatarUrl: string;
  roleName: "general_manager" | "department_manager" | "member";
}

export const listOrgMembers = async ({
  departmentId,
  orgId,
}: ListOrgMembersParams) => {
  return await axios.post(`/org/manage/structure/list-members?orgId=${orgId}`, {
    departmentId,
  });
};

interface UseOrgMemberListParams {
  orgId: string;
  departmentId?: string;
}

export const useOrgMemberList = ({
  orgId,
  departmentId,
}: UseOrgMemberListParams) => {
  return useSWR(
    [`/org/manage/structure/list-members?orgId=${orgId}`, departmentId],
    (url, d) => {
      return axios(url, {
        data: { departmentId: d || null },
        codeHandlers: {},
      }).then((res) => res.data.members as OrgMember[]);
    }
  );
};
