import * as React from "react";
import {
  IonBackButton,
  IonButtons,
  IonContent,
  IonHeader,
  IonPage,
  IonTitle,
  IonToolbar,
} from "@ionic/react";
import BasicInfo from "./components/BasicInfo";

export default () => {
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            <IonBackButton defaultHref="/" text="" />
          </IonButtons>
          <IonTitle>申请成立</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent>
        <BasicInfo />
      </IonContent>
    </IonPage>
  );
};
