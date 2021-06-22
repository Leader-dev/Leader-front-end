import axios from "@/utils/request";

interface GetJoinedOrgListItem {
  id: string;
  numberId: number;
  name: string;
  address: string;
  addressAuth: string;
  typeAliases: string[];
  posterUrl: string;
  memberCount: number;
  status: string;
}

export const getJoinedOrgList = async () => {
  return (await axios.post("/org/joined")).data.list as GetJoinedOrgListItem[];
};
