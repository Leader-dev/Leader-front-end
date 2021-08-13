import {
  IonButton,
  IonCard,
  IonCol,
  IonGrid,
  IonIcon,
  IonImg,
  IonLabel,
  IonRow,
} from "@ionic/react";
import * as React from "react";
import { useStartUrl } from "@/services/service/image/accessStartUrl";
import { OrgInfo } from "@/types/organization";
import {
  checkmarkCircle,
  ellipse,
  helpCircle,
  peopleSharp,
} from "ionicons/icons";

interface ECACardInfo extends OrgInfo {
  notificationCount: number;
}

interface ECARequestCardInfo {
  id: string;
  orgInfo: OrgInfo;
  notificationCount: number;
  status: "passed" | "accepted" | "declined" | "rejected" | "pending";
}

export const ECACard = ({ info }: { info: ECACardInfo }) => {
  const { data: startUrl } = useStartUrl();
  let authIcon, authColor;
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
    <IonCard style={{ margin: "10px 0" }}>
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
            size="4"
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
            <div style={{ color: "var(--ion-color-medium)", fontSize: "100%" }}>
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
              负责人:{" "}
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
          <IonCol
            className="ion-align-self-center"
            size="3"
            style={{ textAlign: "right" }}
          >
            {/*<div>*/}
            {/*  {info.notificationCount && (*/}
            {/*    <IonBadge color="danger">{info.notificationCount}</IonBadge>*/}
            {/*  )}*/}
            {/*</div>*/}
            <IonButton
              fill="outline"
              size="small"
              routerLink={`/org/${info.id}/home`}
              style={{ "--border-radius": "8px" }}
            >
              点击管理
            </IonButton>
          </IonCol>
        </IonRow>
      </IonGrid>
    </IonCard>
  );
};

export const ECARequestCard = ({ info }: { info: ECARequestCardInfo }) => {
  const { data: startUrl } = useStartUrl();
  let authIcon, authColor;
  if (info.orgInfo.instituteAuth === "official") {
    authIcon = (
      <IonIcon icon={checkmarkCircle} style={{ marginRight: "2px" }} />
    );
    authColor = "var(--ion-color-primary)";
  } else {
    authIcon = <IonIcon icon={helpCircle} style={{ marginRight: "2px" }} />;
    authColor = "var(--ion-color-warning)";
  }
  console.log(info);

  return (
    <IonCard style={{ margin: "10px 0" }}>
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
              src={startUrl + info.orgInfo.posterUrl}
            />
          </IonCol>
          <IonCol
            className="ion-align-self-center"
            size="4"
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
              {info.orgInfo.name}
            </div>
            <div style={{ color: "var(--ion-color-medium)", fontSize: "100%" }}>
              {info.orgInfo.numberId}
            </div>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                color: authColor,
              }}
            >
              {authIcon}
              {info.orgInfo.instituteName}
            </div>
            <div
              style={{
                textOverflow: "ellipsis",
                whiteSpace: "nowrap",
                overflow: "hidden",
              }}
            >
              负责人:{" "}
              <span style={{ color: "var(--ion-color-primary)" }}>
                {info.orgInfo.presidentName}
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
              成员数 {info.orgInfo.memberCount}
            </div>
          </IonCol>
          <IonCol
            // className="ion-align-items-center"
            size="3"
            style={{ position: "relative" }}
          >
            {/*<div>*/}
            {/*  {info.notificationCount && (*/}
            {/*    <IonBadge color="danger">{info.notificationCount}</IonBadge>*/}
            {/*  )}*/}
            {/*</div>*/}
            <IonButton
              fill="outline"
              size="small"
              style={{ position: "absolute", top: "35%", right: "0" }}
              routerLink={`/org/application/${info.id}`}
            >
              查看详情
            </IonButton>

            <IonLabel
              color={
                info.status === "rejected"
                  ? "danger"
                  : ["passed", "accepted", "declined"].includes(info.status)
                  ? "success"
                  : "warning"
              }
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "flex-end",
                fontSize: "80%",
                marginTop: "5px",
                position: "absolute",
                bottom: "8px",
                right: "4px",
              }}
            >
              <IonIcon
                style={{ marginRight: "2px", fontSize: "80%" }}
                icon={ellipse}
              />
              {info.status === "rejected"
                ? "已拒绝"
                : ["passed", "accepted", "declined"].includes(info.status)
                ? "已通过"
                : "审核中"}
            </IonLabel>
          </IonCol>
        </IonRow>
      </IonGrid>
    </IonCard>
  );
};
