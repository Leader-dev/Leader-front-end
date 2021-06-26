import axios from "@/utils/request";

interface GetHomeOrgsResult {
  code: number;
  pic: { id: string; posterUrl: string }[];
  list: {
    id: string;
    numberId: number;
    name: string;
    address: string;
    addressAuth: string;
    typeAliases: string[];
    posterUrl: string;
    memberCount: number;
  }[];
}

export const getHomeOrgs = async () => {
  return (await axios.post("/org/home")).data as GetHomeOrgsResult;
};
