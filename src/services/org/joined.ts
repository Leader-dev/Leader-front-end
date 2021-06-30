import axios from "@/utils/request";
import useSWR from "swr";

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
  presidentName: string;
}

export const getJoinedOrgList = async () => {
  return (await axios.post("/org/joined")).data.list as GetJoinedOrgListItem[];
};

export const useJoinedOrgList = () => {
  return useSWR("/org/joined", (url) =>
    axios(url).then((res) => res.data.list as GetJoinedOrgListItem)
  );
};
