import axios from "@/utils/request";
import { mutate } from "swr";

interface SetPublicInfoParams {
  name: string;
  address: string;
  instituteName: string;
  introduction: string;
  phone: string[];
  email: string[];
  typeAliases: string[];
}

export const setOrgPublicInfo = async ({
  publicInfo,
  orgId,
}: {
  publicInfo: SetPublicInfoParams;
  orgId: string;
}) => {
  await axios.post(`/org/manage/public-info/set?orgId=${orgId}`, {
    publicInfo,
  });
  await mutate(`/org/manage/public-info/get?orgId=${orgId}`);
};
