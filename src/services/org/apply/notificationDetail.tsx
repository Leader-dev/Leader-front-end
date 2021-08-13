import axios from "@/utils/request";
import useSWR, { mutate } from "swr";
import { NotificationDetail } from "@/types/recruit";

export const useNotificationDetail = ({
  notificationId,
  applicationId,
}: {
  notificationId: string;
  applicationId: string;
}) => {
  return useSWR(
    ["/org/apply/notification-detail", notificationId],
    (url, notificationId) =>
      axios.post(url, { notificationId: notificationId }).then((res) => {
        mutate(["/org/apply/detail", applicationId]);
        return res.data.detail as NotificationDetail;
      })
  );
};
