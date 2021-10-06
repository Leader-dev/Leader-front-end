import axios from "@/utils/request";

export const deleteTimelineEvent = async ({
  orgId,
  timelineItemId,
}: {
  orgId: string;
  timelineItemId: string;
}) => {
  await axios.post(`/org/manage/timeline/delete?orgId=${orgId}`, {
    timelineItemId,
  });
};
