import axios from "@/utils/request";

export interface CreateOrgArgs {
  name: string;
  address: string;
  introduction: string;
  phone: string;
  email: string;
  typeAliases: string[];
  posterUrl: string[];
}

export const createOrg = async (data: CreateOrgArgs) => {
  await axios.post("/org/create", data);
};
