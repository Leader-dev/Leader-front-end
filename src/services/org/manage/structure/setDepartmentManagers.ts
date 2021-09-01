import axios from "@/utils/request";
import { mutate } from "swr";

type SetDepartmentManagersProps = {
  memberIds: string[];
  departmentId: string;
  orgId: string;
};

export const setDepartmentManagers = async ({
  memberIds,
  orgId,
  departmentId,
}: SetDepartmentManagersProps) => {
  await axios.post(
    `/org/manage/structure/set-department-manager?orgId=${orgId}`,
    {
      memberIds,
      departmentId,
    }
  );
  await mutate([
    `/org/manage/structure/list-members?orgId=${orgId}`,
    departmentId,
  ]);
};
