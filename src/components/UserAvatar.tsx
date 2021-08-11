import * as React from "react";
import { IonAvatar, IonImg } from "@ionic/react";
import { useStartUrl } from "@/services/service/image/accessStartUrl";

export default ({ url }: { url: string | null }) => {
  const { data: startUrl } = useStartUrl();
  return (
    <IonAvatar style={{ marginRight: "6px" }}>
      <IonImg src={startUrl + (url ?? "v1_kFyRFV8KphjM31x03ykLjBshXLnXrabA")} />
    </IonAvatar>
  );
};
