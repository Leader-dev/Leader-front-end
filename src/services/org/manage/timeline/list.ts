import useSWR from "swr";
import { TimelineEvent } from "@/types/timeline";
import axios from "@/utils/request";

export const useOrgTimeline = ({ orgId }: { orgId: string }) => {
  return useSWR(`/org/manage/timeline/list?orgId=${orgId}`, (d) =>
    axios(d).then((res) => res.data.timeline as TimelineEvent[])
  );
};
