import axios from "@/utils/request";
import useSWR from "swr";
import { NotificationDetail } from "@/types/recruit";

export const useOrgNotificationDetail = ({
  notificationId,
  orgId,
}: {
  notificationId: string;
  orgId: string;
}) => {
  return useSWR(
    [`/org/manage/apply/notification-detail?orgId=${orgId}`, notificationId],
    (url, notificationId) =>
      axios
        .post(url, { notificationId: notificationId })
        .then((res) => res.data.detail as NotificationDetail)
  );
};
