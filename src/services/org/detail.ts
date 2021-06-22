import axios from "@/utils/request";

interface GetOrgDetailsArgs {
  organizationId: string;
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
}

export const getOrgDetails = async ({ organizationId }: GetOrgDetailsArgs) => {
  return (await axios.post("/org/detail", { organizationId })).data.detail;
};
