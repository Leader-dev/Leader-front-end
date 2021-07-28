import axios from "@/utils/request";

type CreateOrgDepartment = {
  parentId: string | null;
  name: string;
  orgId: string;
};

export const createOrgDepartment = async ({
  orgId,
  name,
  parentId,
}: CreateOrgDepartment) => {
  await axios.post(`/org/manage/structure/create-department?orgId=${orgId}`, {
    parentId,
    name,
  });
};
