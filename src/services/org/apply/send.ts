import axios from "@/utils/request";

declare global {
  type ApplicationForm = Array<{ question: string; answer: string }>;
}

interface ApplyToOrgParams {
  orgId: string;
  departmentId: string;
  applicationForm: ApplicationForm;
}

export const applyToOrg = async (data: ApplyToOrgParams) => {
  await axios.post("/org/apply/send", data);
};
