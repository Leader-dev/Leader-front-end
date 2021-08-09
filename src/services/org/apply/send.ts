import { ApplicationForm } from "@/types/organization";
import axios from "@/utils/request";
import { mutate } from "swr";
import { getOrgDetails } from "@/services/org/detail";
import { fetchMyApplicationList } from "@/services/org/apply/list";

interface ApplyToOrgParams {
  orgId: string;
  name: string;
  departmentId: string | null;
  applicationForm: ApplicationForm;
}

export const applyToOrg = async (data: ApplyToOrgParams) => {
  await axios.post("/org/apply/send", data);
  await mutate(["/org/detail", data.orgId]);
  await mutate("/org/apply/list");
};
