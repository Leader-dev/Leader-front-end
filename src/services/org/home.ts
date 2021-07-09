import axios from "@/utils/request";
import useSWR from "swr";
import { OrgInfo } from "@/types/organization";

export interface GetHomeOrgsResult {
  pic: { id: string; posterUrl: string }[];
  list: OrgInfo[];
}

export const getHomeOrgs = async () => {
  return (await axios.post("/org/home")).data.data as GetHomeOrgsResult;
};

export const useHomeOrg = () => {
  return useSWR("/org/home", (url) =>
    axios(url).then((res) => res.data.data as GetHomeOrgsResult)
  );
};
