import { ApplicationForm } from "@/types/organization";
import axios from "@/utils/request";

interface ApplyToOrgParams {
  orgId: string;
  departmentId: string | null;
  applicationForm: ApplicationForm;
}

export const applyToOrg = async (data: ApplyToOrgParams) => {
  await axios.post("/org/apply/send", data);
};
