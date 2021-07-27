import * as React from "react";
import {
  IonButtons,
  IonContent,
  IonHeader,
  IonPage,
  IonToolbar,
  IonBackButton,
  IonTitle,
  IonLabel,
  IonToggle,
  IonItem,
} from "@ionic/react";
import { chevronBack } from "ionicons/icons";

export default () => {
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonButtons>
            <IonBackButton text="" icon={chevronBack} />
          </IonButtons>
          <IonTitle>招新设置</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <IonItem>
          <IonLabel>是否开启主页申请通道？</IonLabel>
          <IonToggle></IonToggle>
        </IonItem>
      </IonContent>
    </IonPage>
  );
};
