import axios from "@/utils/request";
import useSWR from "swr";
import { OrgInfo } from "@/types/organization";

interface QueryOrgsParams {
  pageSize: number;
  pageNumber?: number;
  /** 搜索社团 id */
  numberId?: string;
  /** 搜索名字 */
  queryName?: string;
  /** 社团类别 */
  typeAlias?: string;
  minMemberCount?: number;
  maxMemberCount?: number;
}

interface QueryOrgsResult {
  list: OrgInfo[];
  totalPages: number;
  totalNumber: number;
}

export const queryOrgs = async (data: QueryOrgsParams) => {
  return (await axios.post("/org/list", data)).data.result as QueryOrgsResult;
};

export const useQueryOrgs = (data: QueryOrgsParams) => {
  return useSWR(["/org/list", data], (url, d) =>
    axios.post(url, d).then((res) => res.data.result as QueryOrgsResult)
  );
};
