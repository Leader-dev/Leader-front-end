import axios from "@/utils/request";
import useSWR from "swr";
import { OrgInfo, AdInfo } from "@/types/organization";

interface GetHomeOrgsResult {
  pic: AdInfo[];
  list: OrgInfo[];
}

export const getHomeOrgs = async () => {
  return (await axios.post("/org/home")).data.index as GetHomeOrgsResult;
};

export const useHomeOrg = () => {
  return useSWR("/org/home", (url) =>
    axios(url).then((res) => res.data.index as GetHomeOrgsResult)
  );
};
