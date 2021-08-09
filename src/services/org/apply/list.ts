import { OrgInfo } from "@/types/organization";
import axios from "@/utils/request";
import useSWR from "swr";

type FetchMyApplicationListResult = Array<{
  id: string;
  orgId: string;
  orgInfo: OrgInfo;
  sendDate: number;
  unreadCount: number;
  status: "accepted" | "rejected" | "pending" | "passed" | "declined";
}>;

export const fetchMyApplicationList = async () => {
  return (await axios.post("/org/apply/list")).data
    .list as FetchMyApplicationListResult;
};

export const useMyApplicationList = () => {
  return useSWR("/org/apply/list", (url) =>
    axios(url).then((res) => res.data.list as FetchMyApplicationListResult)
  );
};
