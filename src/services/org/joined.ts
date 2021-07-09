import axios from "@/utils/request";
import useSWR from "swr";
import { OrgInfo } from "@/types/organization";

export interface GetJoinedOrgListItem extends OrgInfo {
  status: string;
  presidentName: string;
}

export const getJoinedOrgList = async () => {
  return (await axios.post("/org/joined")).data.list as GetJoinedOrgListItem[];
};

export const useJoinedOrgList = () => {
  return useSWR("/org/joined", (url) =>
    axios(url).then((res) => res.data.list as GetJoinedOrgListItem[])
  );
};
