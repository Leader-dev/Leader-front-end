import * as React from "react";
import {
  IonButtons,
  IonBackButton,
  IonLabel,
  IonPage,
  IonSegment,
  IonSegmentButton,
  IonToolbar,
} from "@ionic/react";
import { ECAInfo } from "./ECAInfoCard";

export interface ECADetailInfo extends ECAInfo {
  introduction: string;
  detailAddress: string;
  email: string[];
  phone: number;
}

export default () => {
  return (
    <IonPage>
      <IonToolbar>
        <IonButtons slot="start">
          <IonBackButton text="buttonText" icon="buttonIcon" />
        </IonButtons>
      </IonToolbar>

      <IonSegment>
        <IonSegmentButton>
          <IonLabel> 详细信息 </IonLabel>
          <IonLabel> 对外联络 </IonLabel>
        </IonSegmentButton>
      </IonSegment>
    </IonPage>
  );
};
