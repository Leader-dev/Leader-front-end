import axios from "@/utils/request";
import useSWR from "swr";
import { OrgDepartment } from "@/types/organization";

export const useApplyDepartmentList = ({ orgId }: { orgId: string }) => {
  return useSWR(["/org/apply/list-departments", orgId], (url, orgId) =>
    axios(url, { data: { orgId }, codeHandlers: {} }).then(
      (res) => res.data.departments as OrgDepartment[]
    )
  );
};
