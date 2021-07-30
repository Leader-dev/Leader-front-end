import axios from "@/utils/request";

type EditDepartmentNameProps = {
  name: string;
  orgId: string;
  departmentId: string;
};

export const editDepartmentName = async ({
  name,
  orgId,
  departmentId,
}: EditDepartmentNameProps) => {
  await axios.post(`/org/manage/structure/rename-department?orgId=${orgId}`, {
    name,
    departmentId,
  });
};
