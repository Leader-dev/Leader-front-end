import {
  IonContent,
  IonHeader,
  IonPage,
  IonTitle,
  IonToolbar,
} from "@ionic/react";
import "./index.css";
import * as React from "react";

const Management: React.FC = () => {
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>管理</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen></IonContent>
    </IonPage>
  );
};

export default Management;
