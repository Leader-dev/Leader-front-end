import axios from "@/utils/request";
import useSWR from "swr";
import { OrgMember } from "@/types/organization";

interface RecruitMangerInfo {
  memberInfo: OrgMember;
  departments: {
    id: string;
    name: string;
    recruitManagerCount: number;
  }[];
}

export const useRecruitManagerInfo = ({
  orgId,
  departmentId,
}: {
  orgId: string;
  departmentId: string | null;
}) => {
  return useSWR(
    [
      `/org/manage/apply/setting/get-recruit-manager-info?orgId=${orgId}`,
      departmentId,
    ],
    (url, departmentId) => {
      return axios
        .post(url, { departmentId: departmentId })
        .then((res) => res.data.data as RecruitMangerInfo);
    }
  );
};
