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
import { OrgInfo } from "@/types/organization";
import { useStartUrl } from "@/services/service/image/accessStartUrl";

export default ({
  info,
  interactive,
}: {
  info: OrgInfo;
  interactive: boolean;
}) => {
  let authIcon, authColor;
  const { data: startUrl } = useStartUrl();

  if (info.instituteAuth === "official") {
    authIcon = (
      <IonIcon icon={checkmarkCircle} style={{ marginRight: "2px" }} />
    );
    authColor = "var(--ion-color-primary)";
  } else {
    authIcon = <IonIcon icon={helpCircle} style={{ marginRight: "2px" }} />;
    authColor = "var(--ion-color-warning)";
  }

  return (
    <IonCard
      button={interactive}
      style={{ margin: "10px 0" }}
      routerLink={interactive ? `/org/${info.id}/detail` : undefined}
    >
      <IonGrid style={{ padding: "12px" }}>
        <IonRow>
          <IonCol size="5">
            <IonImg
              style={{
                borderRadius: "8px",
                width: "100%",
                height: "12vh",
                objectFit: "cover",
                overflow: "hidden",
              }}
              src={startUrl + info.posterUrl}
            />
          </IonCol>
          <IonCol
            className="ion-align-self-center"
            size="7"
            style={{ fontSize: "85%", color: "black", lineHeight: "150%" }}
          >
            <div
              style={{
                fontSize: "120%",
                fontWeight: "bold",
                lineHeight: "160%",
                textOverflow: "ellipsis",
                whiteSpace: "nowrap",
                overflow: "hidden",
              }}
            >
              {info.name}
            </div>
            <div
              style={{
                fontSize: "100%",
                color: "var(--ion-color-medium)",
              }}
            >
              {info.numberId}
            </div>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                color: authColor,
              }}
            >
              {authIcon}
              {info.instituteName}
            </div>
            <div
              style={{
                textOverflow: "ellipsis",
                whiteSpace: "nowrap",
                overflow: "hidden",
              }}
            >
              负责人：
              <span style={{ color: "var(--ion-color-primary)" }}>
                {info.presidentName}
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
              成员数 {info.memberCount}
            </div>
          </IonCol>
        </IonRow>
      </IonGrid>
    </IonCard>
  );
};
