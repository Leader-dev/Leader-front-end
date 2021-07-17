import * as React from "react";
import { IonCol, IonGrid, IonButton, IonRow, IonIcon } from "@ionic/react";
import { OrgDetailsResult } from "@/types/organization";
import { checkmarkCircle, helpCircle, peopleSharp } from "ionicons/icons";
import { Link } from "react-router-dom";

export default ({ info }: { info: OrgDetailsResult }) => {
  const { detail, applicationStatus } = info;

  let button;
  if (applicationStatus === "closed") {
    button = (
      <IonButton color="dark" size="small" disabled={true}>
        招新关闭
      </IonButton>
    );
  } else if (applicationStatus === "available") {
    button = (
      <Link to="apply">
        <IonButton color="primary" size="small">
          申请加入
        </IonButton>
      </Link>
    );
  } else if (applicationStatus === "joined") {
    button = (
      <IonButton color="success" size="small" disabled={true}>
        已加入
      </IonButton>
    );
  } else if (applicationStatus === "applied") {
    button = (
      <IonButton color="medium" size="small" disabled={true}>
        已申请
      </IonButton>
    );
  } else {
    button = "error";
  }

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
    <IonGrid>
      <IonRow>
        <IonCol style={{ fontSize: "90%", lineHeight: "130%" }}>
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
        <IonCol
          size="4"
          className="ion-align-self-center"
          style={{ textAlign: "right" }}
        >
          {button}
        </IonCol>
      </IonRow>
      <IonRow
        style={{
          marginTop: "5px",
          fontSize: "120%",
          fontWeight: "bold",
          color: "#4E6B84",
          lineHeight: "160%",
        }}
      >
        简介：
      </IonRow>
      <IonRow style={{ fontSize: "95%", lineHeight: "125%" }}>
        {detail.introduction}
      </IonRow>
    </IonGrid>
  );
};
