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
import { useHistory } from "react-router";

export default ({
  info,
  interactive,
}: {
  info: OrgInfo;
  interactive: boolean;
}) => {
  let authIcon, authColor;
  if (info.instituteAuth === "school") {
    authIcon = (
      <IonIcon icon={checkmarkCircle} style={{ marginRight: "2px" }} />
    );
    authColor = "var(--ion-color-primary)";
  } else {
    authIcon = <IonIcon icon={helpCircle} style={{ marginRight: "2px" }} />;
    authColor = "var(--ion-color-warning)";
  }

  const history = useHistory();
  const handleOnClick = () => {
    if (!interactive) return;
    history.push(`/org/${info.id}/detail`);
  };

  return (
    <IonCard style={{ margin: "10px 0" }} onClick={handleOnClick}>
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
              src={info.posterUrl}
            />
          </IonCol>
          <IonCol
            className="ion-align-self-center"
            size="6"
            style={{ fontSize: "80%", color: "black", lineHeight: "150%" }}
          >
            <div
              style={{
                fontSize: "120%",
                fontWeight: "bold",
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
            <div>
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
