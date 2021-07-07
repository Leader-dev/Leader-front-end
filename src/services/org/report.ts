import axios from "@/utils/request";

interface ReportOrgParams {
  orgId: string;
  description: string;
  imageUrls: string[];
}

export const reportOrg = async (data: ReportOrgParams) => {
  await axios.post("/org/report", { reportInfo: data });
};
