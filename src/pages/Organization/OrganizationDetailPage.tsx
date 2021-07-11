import * as React from "react";
import {
  IonButtons,
  IonBackButton,
  IonLabel,
  IonPage,
  IonSegment,
  IonSegmentButton,
  IonToolbar,
  IonHeader,
} from "@ionic/react";

export default () => {
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            <IonBackButton text="buttonText" icon="buttonIcon" />
          </IonButtons>
        </IonToolbar>
      </IonHeader>

      <IonSegment>
        <IonSegmentButton>
          <IonLabel> 详细信息 </IonLabel>
          <IonLabel> 对外联络 </IonLabel>
        </IonSegmentButton>
      </IonSegment>
    </IonPage>
  );
};
