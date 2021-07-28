import { uploadImageList } from "@/services/external/uploadImage";
import axios from "@/utils/request";

type SendApplicationNotificationProps = {
  applicationId: string;

  title: string;
  content: string;
  images: File[];

  orgId: string;
};

export const sendApplicationNotification = async ({
  applicationId,
  title,
  content,
  images,
  orgId,
}: SendApplicationNotificationProps) => {
  const imageUrls = await uploadImageList(images);
  await axios.post(`/org/manage/apply/send-notification?orgId=${orgId}`, {
    applicationId,
    notification: {
      title,
      content,
      imageUrls,
    },
  });
};
