import * as React from "react";
import {
  IonCard,
  IonCol,
  IonGrid,
  IonIcon,
  IonImg,
  IonRow,
} from "@ionic/react";
import { checkmarkCircle, helpCircle, peopleSharp } from "ionicons/icons";
import { OrgDetailsResult } from "@/types/organization";

export default ({ info }: { info: OrgDetailsResult }) => {
  const { detail } = info;
  let authIcon, authColor;
  if (detail.instituteAuth === "school") {
    authIcon = (
      <IonIcon icon={checkmarkCircle} style={{ marginRight: "2px" }} />
    );
    authColor = "var(--ion-color-primary)";
  } else {
    authIcon = <IonIcon icon={helpCircle} style={{ marginRight: "2px" }} />;
    authColor = "var(--ion-color-warning)";
  }

  return (
    <IonCard style={{ margin: "10px 0" }}>
      <IonGrid style={{ padding: "12px" }}>
        <IonRow>
          <IonCol size="5">
            <IonImg
              style={{
                borderRadius: "8px",
                width: "100%",
                height: "100%",
                objectFit: "cover",
                overflow: "hidden",
              }}
              src={detail.posterUrl}
            />
          </IonCol>
          <IonCol
            className="ion-align-self-center"
            size="6"
            style={{ fontSize: "80%", lineHeight: "140%", color: "black" }}
          >
            <div
              style={{
                fontSize: "120%",
                fontWeight: "bold",
                lineHeight: "150%",
              }}
            >
              {detail.name}
            </div>
            <div
              style={{
                fontSize: "100%",
                color: "var(--ion-color-medium)",
                lineHeight: "140%",
              }}
            >
              {detail.numberId}
            </div>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                color: authColor,
              }}
            >
              {authIcon}
              {detail.instituteName}
            </div>
            <div>
              负责人：
              <span style={{ color: "var(--ion-color-primary)" }}>
                {detail.presidentName}
              </span>
            </div>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                color: "var(--ion-color-primary)",
              }}
            >
              <IonIcon icon={peopleSharp} style={{ marginRight: "2px" }} />
              成员数 {detail.memberCount}
            </div>
          </IonCol>
        </IonRow>
      </IonGrid>
    </IonCard>
  );
};
