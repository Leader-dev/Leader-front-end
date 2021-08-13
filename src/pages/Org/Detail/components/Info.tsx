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
      <IonButton
        style={{ height: "30px" }}
        color="dark"
        size="small"
        disabled={true}
      >
        招新关闭
      </IonButton>
    );
  } else if (applicationStatus === "available") {
    button = (
      <IonButton
        style={{ height: "30px" }}
        color="primary"
        size="small"
        routerLink={"apply"}
      >
        申请加入
      </IonButton>
    );
  } else if (applicationStatus === "joined") {
    button = (
      <IonButton
        style={{ height: "30px" }}
        color="success"
        size="small"
        disabled={true}
      >
        已加入
      </IonButton>
    );
  } else if (applicationStatus === "applied") {
    button = (
      <IonButton
        style={{ height: "30px" }}
        color="medium"
        size="small"
        disabled={true}
      >
        已申请
      </IonButton>
    );
  } else {
    button = "error";
  }

  let authIcon, authColor;
  if (detail.instituteAuth === "official") {
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
        <IonCol style={{ fontSize: "90%", lineHeight: "150%" }}>
          <div
            style={{
              fontSize: "120%",
              fontWeight: "bold",
              lineHeight: "160%",
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
          marginBottom: "2px",
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
