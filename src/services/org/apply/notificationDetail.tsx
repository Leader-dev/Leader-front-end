import axios from "@/utils/request";
import useSWR from "swr";

interface NotificationDetailResult {
  id: string;
  applicationId: string;
  title: string;
  content: string;
  imageUrls: string[];
  unread: boolean;
  sendDate: number;
}

export const useNotificationDetail = (notificationId: string) => {
  return useSWR(
    ["/org/apply/notification-detail", notificationId],
    (url, notificationId) =>
      axios(url, { data: { notificationId }, codeHandlers: {} }).then(
        (res) => res.data.detail as NotificationDetailResult
      )
  );
};
