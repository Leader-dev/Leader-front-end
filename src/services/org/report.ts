import axios from "@/utils/request";

interface ReportOrgParams {
  organizationId: string;
  description: string;
  imageUrls: string[];
}

export const reportOrg = async (data: ReportOrgParams) => {
  await axios.post("/org/report", data);
};
