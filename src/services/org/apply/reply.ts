import axios from "@/utils/request";
import { mutate } from "swr";

interface RespondToApplicationParams {
  applicationId: string;
  action: "accept" | "decline";
}

export const respondToApplication = async (
  data: RespondToApplicationParams
) => {
  await axios.post("/org/apply/reply", data);
  await mutate(["/org/apply/detail", data.applicationId]);
  await mutate("/org/joined");
};
