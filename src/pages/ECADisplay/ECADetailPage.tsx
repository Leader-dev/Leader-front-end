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
import { ECAInfo } from "./Component/ECAInfoCard";

interface applicationScheme {
  open: boolean;
  auth: boolean;
  appointDepartment: boolean;
  questions: string[];
}

export interface ECADetailInfo extends ECAInfo {
  introduction: string;
  address: string;
  addressAuth: string;
  email: string[];
  phone: string[];
  typeAliases: string[];
  applicationScheme: applicationScheme;
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
