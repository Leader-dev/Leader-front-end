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

export const useNotificationDetail = ({
  notification,
}: {
  notification: string;
}) => {
  return useSWR(
    ["/org/apply/notification-detail", notification],
    (url, notification) =>
      axios(url, { data: { notification }, codeHandlers: {} }).then(
        (res) => res.data.departments as NotificationDetailResult[]
      )
  );
};
