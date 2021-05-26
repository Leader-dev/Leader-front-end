import {
  IonContent,
  IonHeader,
  IonPage,
  IonTitle,
  IonToolbar,
} from "@ionic/react";
import * as React from "react";
import "./index.css";

const Coop: React.FC = () => {
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>合作</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen></IonContent>
    </IonPage>
  );
};

export default Coop;
