import axios from "@/utils/request";

type DeleteOrgDepartmentParams = {
  orgId: string;
  departmentId: string;
};

export const deleteOrgDepartment = async ({
  orgId,
  departmentId,
}: DeleteOrgDepartmentParams) => {
  await axios.post(`/org/manage/structure/delete-department?orgId=${orgId}`, {
    departmentId,
  });
};
