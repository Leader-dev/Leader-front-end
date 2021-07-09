import axios from "@/utils/request";
import useSWR from "swr";
import { OrgInfo } from "@/types/organization";

interface GetJoinedOrgListItem extends OrgInfo {
  address: string;
  addressAuth: string;
  /**
   * @value 如果为 “school” 则为学校认证
   */
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
