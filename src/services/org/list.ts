import axios from "@/utils/request";

interface QueryOrgsParams {
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

declare global {
  interface OrgInfo {
    id: string;
    numberId: number;
    name: string;
    address: string;
    /** 组织认证
     * @value school 为学校认证
     */
    addressAuth: "school" | string;
    /** 组织类别 */
    typeAliases: string[];
    /** 组织海报图片地址 url */
    posterUrl: string;
    memberCount: number;
  }
}

interface QueryOrgsResult {
  code: number;
  list: OrgInfo[];
  totalPages: number;
  totalNumber: number;
}

export const queryOrgs = async (data: QueryOrgsParams) => {
  return (await axios.post("/org/list")).data as QueryOrgsResult;
};
