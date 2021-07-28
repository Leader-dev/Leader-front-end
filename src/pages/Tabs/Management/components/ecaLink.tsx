import {
  IonBadge,
  IonButton,
  IonCard,
  IonCardContent,
  IonChip,
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
import { ellipse, peopleSharp } from "ionicons/icons";

interface ECACardInfo extends OrgInfo {
  notificationCount: number;
}

interface ECARequestCardInfo extends OrgInfo {
  notificationCount: number;
  status: string;
}

export const ECACard = ({ info }: { info: ECACardInfo }) => {
  const { data: startUrl } = useStartUrl();
  return (
    <IonCard style={{ margin: "10px 0" }}>
      <IonGrid style={{ padding: "12px" }}>
        <IonRow>
          <IonCol size="5">
            <IonImg // TODO: Fix aspect ratio & height problems
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
            <div style={{ fontSize: "120%", fontWeight: "bold" }}>
              {info.name}
            </div>
            <div style={{ color: "var(--ion-color-medium)", fontSize: "100%" }}>
              {info.numberId}
            </div>
            <div style={{ color: "var(--ion-color-primary" }}>
              {info.instituteName}
            </div>
            <div>
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
  return (
    <IonCard style={{ margin: "10px 0" }}>
      <IonGrid style={{ padding: "12px" }}>
        <IonRow>
          <IonCol size="5">
            <IonImg // TODO: Fix aspect ratio & height problems
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
            style={{ fontSize: "85%", color: "black", lineHeight: "160%" }}
          >
            <div style={{ fontSize: "120%", fontWeight: "bold" }}>
              {info.name}
            </div>
            <div style={{ color: "var(--ion-color-medium)", fontSize: "100%" }}>
              {info.numberId}
            </div>
            <div style={{ color: "var(--ion-color-primary" }}>
              {info.instituteName}
            </div>
            <div>
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
            <IonButton fill="outline" size="small">
              查看详情
            </IonButton>
            <IonLabel
              color={
                info.status === "rejected"
                  ? "danger"
                  : info.status === "accepted"
                  ? "success"
                  : "warning"
              }
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "flex-end",
                fontSize: "80%",
              }}
            >
              <IonIcon style={{ marginRight: "2px" }} icon={ellipse} />
              {info.status === "rejected"
                ? "已拒绝"
                : info.status === "accepted"
                ? "已通过"
                : "审核中"}
            </IonLabel>
          </IonCol>
        </IonRow>
      </IonGrid>
    </IonCard>
  );
};
