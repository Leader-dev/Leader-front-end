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

export interface OrgDetailsResult extends OrgInfo {
  introduction: string;
  phone: string;
  email: string;
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
