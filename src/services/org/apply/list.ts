import { OrgInfo } from "@/types/organization";
import axios from "@/utils/request";

type FetchMyApplicationListResult = Array<{
  id: string;
  orgId: string;
  orgInfo: OrgInfo;
  sendDate: number;
  unreadCount: number;
  status: string;
}>;

export const fetchMyApplicationList = async () => {
  return (await axios.post("/org/apply/list")).data
    .list as FetchMyApplicationListResult;
};
