import * as React from "react";
import { IonAvatar, IonImg } from "@ionic/react";
import { useStartUrl } from "@/services/service/image/accessStartUrl";
import { CSSProperties } from "react";

export default ({
  src,
  style = { marginRight: "8px" },
  isObjectUrl = false,
}: {
  src: string | null;
  style?: CSSProperties;
  isObjectUrl?: boolean;
}) => {
  const { data: startUrl } = useStartUrl();
  return (
    <IonAvatar style={style}>
      <IonImg
        src={
          isObjectUrl
            ? src!
            : startUrl + (src ?? "v1_kFyRFV8KphjM31x03ykLjBshXLnXrabA")
        }
      />
    </IonAvatar>
  );
};
