import axios from "@/utils/request";
import useSWR from "swr";
import { OrgInfo } from "@/types/organization";

interface GetJoinedOrgListItem {
  status: string;
  notificationCount: number;
  id: string;
  numberId: number;
  name: string;
  instituteName: string;
  instituteAuth: string;
  /**
   * @value 如果为 “school” 则为学校认证
   */
  typeAliases: string[];
  /** 组织海报图片地址 url */
  posterUrl: string;
  memberCount: number;
  presidentName: string;
  address: string;
  addressAuth: "" | "school";
}

export const getJoinedOrgList = async () => {
  return (await axios.post("/org/joined")).data.list as GetJoinedOrgListItem[];
};

export const useJoinedOrgList = () => {
  return useSWR("/org/joined", (url) =>
    axios(url).then((res) => res.data.list as GetJoinedOrgListItem[])
  );
};
