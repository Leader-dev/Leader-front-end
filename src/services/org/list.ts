import axios from "@/utils/request";
import useSWR from "swr";
import { OrgInfo } from "@/types/organization";

export interface QueryOrgsParams {
  pageSize: number;
  pageNumber?: number;
  // numberId: string;
  /** 搜索名字 */
  queryName?: string;
  /** 社团类别 */
  typeAlias?: string;
  minMemberCount?: number;
  maxMemberCount?: number;
}

export interface QueryOrgsResult {
  list: OrgInfo[];
  totalPages: number;
  totalNumber: number;
}

export const queryOrgs = async (data: QueryOrgsParams) => {
  return (await axios.post("/org/list", data)).data.data as QueryOrgsResult;
};

export const useQueryOrgs = (data: QueryOrgsParams) => {
  return useSWR(["/org/list", data], (url, d) =>
    axios.post(url, d).then((res) => res.data.data as QueryOrgsResult)
  );
};
