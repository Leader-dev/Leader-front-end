import * as React from "react";
import { IonContent, IonHeader, IonPage } from "@ionic/react";
import { ToolbarWithBackButton } from "@/components/ToolbarWithBackButton";

export default () => {
  return (
    <IonPage>
      <IonHeader>
        <ToolbarWithBackButton title={"用户协议"} />
      </IonHeader>
      <IonContent fullscreen></IonContent>
    </IonPage>
  );
};
