import * as React from "react";
import { IonButtons, IonTitle, IonToolbar, IonBackButton } from "@ionic/react";
import { chevronBack } from "ionicons/icons";

export const ToolbarWithBackButton: React.FC<{ title: string }> = ({
  title,
}) => {
  return (
    <IonToolbar>
      <IonButtons>
        <IonBackButton text="" icon={chevronBack} defaultHref="/" />
      </IonButtons>
      <IonTitle>{title}</IonTitle>
    </IonToolbar>
  );
};
