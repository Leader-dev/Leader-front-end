import axios from "@/utils/request";

interface RespondToApplicationParams {
  applicationId: string;
  action: "accept" | "decline";
}

export const respondToApplication = async (
  data: RespondToApplicationParams
) => {
  await axios.post("/org/apply/reply", data);
};
