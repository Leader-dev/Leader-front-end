import { Timestamp } from "@/types/organization";
import axios from "@/utils/request";

export const insertTimelineEvent = async ({
  orgId,
  timestamp,
  description,
}: {
  orgId: string;
  timestamp: Timestamp;
  description: string;
}) => {
  await axios.post(`/org/manage/timeline/insert?orgId=${orgId}`, {
    timestamp,
    description,
  });
};
