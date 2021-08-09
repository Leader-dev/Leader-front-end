import { ApplicationForm } from "@/types/organization";
import axios from "@/utils/request";
import { mutate } from "swr";

interface ApplyToOrgParams {
  orgId: string;
  name: string;
  departmentId: string | null;
  applicationForm: ApplicationForm;
}

export const applyToOrg = async (data: ApplyToOrgParams) => {
  await axios.post("/org/apply/send", data);
  await mutate(`/org/detail`); // TODO 怎么传参数
};
