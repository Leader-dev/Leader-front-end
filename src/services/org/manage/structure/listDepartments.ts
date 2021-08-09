import axios from "@/utils/request";
import useSWR from "swr";
import { OrgDepartment } from "@/types/organization";

interface UseDepartmentListParams {
  orgId: string;
  parentId?: string;
}

export const useDepartmentList = ({
  orgId,
  parentId,
}: UseDepartmentListParams) => {
  return useSWR(
    [`/org/manage/structure/list-departments?orgId=${orgId}`, parentId],
    (url, d) => {
      return axios(url, {
        data: { parentId: d || null },
        codeHandlers: {},
      }).then((res) => res.data.departments as OrgDepartment[]);
    }
  );
};
