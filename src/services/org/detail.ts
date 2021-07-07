import axios from "@/utils/request";
import useSWR from "swr";

interface GetOrgDetailsArgs {
  orgId: string;
}

interface OrgApplicationScheme {
  open: boolean;
  auth: boolean;
  appointDepartment: boolean;
  questions: string[];
}

interface OrgDetailsResult {
  id: string;
  numberId: number;
  name: string;
  address: string;
  /** 组织认证
   * @value school 为学校认证
   */
  addressAuth: "school" | string;
  /** 组织介绍 */
  introduction: string;
  /** 组织类别 */
  typeAliases: string[];
  /** 组织海报图片地址 url */
  posterUrl: string;
  memberCount: number;
  status: string;
  applicationScheme: OrgApplicationScheme;
  /** 社长名称 */
  presidentName: string;
}

export const getOrgDetails = async ({ orgId }: GetOrgDetailsArgs) => {
  return (await axios.post("/org/detail", { orgId })).data
    .detail as OrgDetailsResult;
};

export const useOrgDetails = ({ orgId }: GetOrgDetailsArgs) => {
  return useSWR(["/org/detail", { orgId }], (url, d) =>
    axios(url, d).then((res) => res.data.detail as OrgDetailsResult)
  );
};
