import axios from "@/utils/request";
import useSWR from "swr";
import { OrgInfo } from "@/types/organization";

interface GetOrgDetailsArgs {
  orgId: string;
}

interface OrgApplicationScheme {
  open: boolean;
  auth: boolean;
  appointDepartment: boolean;
  questions: string[];
}

interface OrgDetails extends OrgInfo {
  introduction: string;
  phone: string;
  email: string;
  address: string;
  addressAuth: string;
  /**
   * @value 如果为 “school” 则为学校认证
   */
  status: string;
  applicationScheme: OrgApplicationScheme;
  /** 社长名称 */
  presidentName: string;
}

interface OrgDetailsResult {
  detail: OrgDetails;
  applicationStatus: string;
  /**
   * @value 用户是否能申请 ("closed” | “available” | “joined" | “applied”)
   */
}

export const getOrgDetails = async ({ orgId }: GetOrgDetailsArgs) => {
  return (await axios.post("/org/detail", { orgId })).data
    .data as OrgDetailsResult;
};

export const useOrgDetails = ({ orgId }: GetOrgDetailsArgs) => {
  return useSWR(["/org/detail", orgId], (url, orgId) =>
    axios(url, { data: { orgId }, codeHandlers: {} }).then(
      (res) => res.data.data as OrgDetailsResult
    )
  );
};
