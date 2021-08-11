import * as React from "react";
import { IonButtons, IonTitle, IonToolbar, IonBackButton } from "@ionic/react";
import { chevronBack } from "ionicons/icons";

export default ({
  title,
  border = true,
  defaultHref = "/",
}: {
  title: string | undefined;
  border?: boolean;
  defaultHref?: string;
}) => {
  return (
    <IonToolbar style={{ "--border-style": border ? "solid" : "none" }}>
      <IonButtons>
        <IonBackButton text="" icon={chevronBack} defaultHref={defaultHref} />
      </IonButtons>
      <IonTitle>{title}</IonTitle>
    </IonToolbar>
  );
};
