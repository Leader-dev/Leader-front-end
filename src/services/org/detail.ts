import axios from "@/utils/request";
import useSWR from "swr";
import { OrgDetailsResult } from "@/types/organization";

interface GetOrgDetailsArgs {
  orgId: string;
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
