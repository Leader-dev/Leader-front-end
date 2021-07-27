import axios from "@/utils/request";
import useSWR from "swr";

interface RecruitMangerInfo {
  memberId: string;
  departments: {
    id: string;
    name: string;
    recruitManagerCount: number;
  };
}

export const useRecruitManagerInfo = ({
  orgId,
  departmentId,
}: {
  orgId: string;
  departmentId: string;
}) => {
  return useSWR(
    [`/org/manage/apply/setting/get-scheme?orgId=${orgId}`, departmentId],
    (url, departmentId) => {
      return axios
        .post(url, { departmentId: departmentId })
        .then((res) => res.data.data as RecruitMangerInfo);
    }
  );
};
