import axios from "@/utils/request";

interface OrgType {
  name: string;
  alias: string;
}

interface OrgTypes {
  [key: string]: OrgType;
}

export const getOrgTypes = async () => {
  return (await axios.post("/org/types")).data.types as OrgTypes;
};
