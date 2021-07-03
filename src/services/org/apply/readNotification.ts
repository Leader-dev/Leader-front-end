import axios from "@/utils/request";

export const setNotificationRead = async (notificationId: string) => {
  await axios.post("/org/apply/read-notification", { notificationId });
};
