/** @jsxImportSource @emotion/react */
import {
  IonButton,
  IonCol,
  IonContent,
  IonHeader,
  IonIcon,
  IonItem,
  IonLabel,
  IonList,
  IonListHeader,
  IonPage,
  IonRouterOutlet,
  IonRow,
  IonText,
} from "@ionic/react";
import ToolbarWithBackButton from "@/components/ToolbarWithBackButton";
import { useParams } from "react-router";
import { useApplicationDetail } from "@/services/org/apply/detail";
import { checkmarkCircle, closeCircle, ellipse } from "ionicons/icons";
import OrgCard from "@/pages/Org/components/OrgCard";
import { useState } from "react";
import { respondToApplication } from "@/services/org/apply/reply";
import { NotificationItem } from "@/pages/Org/components/NotificationDetail";
import {
  NotificationDetailContent,
  NotificationDetailSkeleton,
} from "@/pages/Org/components/NotificationDetail";
import { useNotificationDetail } from "@/services/org/apply/notificationDetail";
import { Route } from "react-router-dom";
import * as React from "react";

const ApplicantNotificationDetailPage = () => {
  const { notificationId } = useParams<{ notificationId: string }>();
  const { applicationId } = useParams<{ applicationId: string }>();
  const { data: notificationDetail } = useNotificationDetail({
    notificationId,
    applicationId,
  });

  let content;
  if (notificationDetail) {
    content = <NotificationDetailContent info={notificationDetail} />;
  } else {
    content = <NotificationDetailSkeleton />;
  }

  return (
    <IonPage>
      <IonHeader>
        <ToolbarWithBackButton title={notificationDetail?.title} />
      </IonHeader>
      <IonContent>{content}</IonContent>
    </IonPage>
  );
};

const ApplicationDetail = () => {
  const { applicationId } = useParams<{ applicationId: string }>();
  const { data: applicationDetail } = useApplicationDetail(applicationId);
  const [loading, setLoading] = useState(false);

  let content;
  if (applicationDetail) {
    const time = new Date(applicationDetail.sendDate);
    content = (
      <>
        <IonList>
          <div style={{ textAlign: "center" }}>
            <h5>加入申请</h5>
          </div>

          <IonItem lines={"none"} style={{ marginBottom: "-10px" }}>
            申请时间：
            <IonText color={"primary"}>
              {`${time.getFullYear()}年${
                time.getMonth() + 1
              }月${time.getDate()}日 
              ${time.getHours()}:${time.getMinutes()}`}
            </IonText>
          </IonItem>
          <IonItem lines={"none"}>
            申请状态：
            <IonText
              color={
                applicationDetail.status === "rejected"
                  ? "danger"
                  : ["passed", "accepted", "declined"].includes(
                      applicationDetail.status
                    )
                  ? "success"
                  : "warning"
              }
              style={{
                display: "flex",
                alignItems: "center",
              }}
            >
              <IonIcon
                style={{ marginRight: "2px", fontSize: "80%" }}
                icon={ellipse}
              />
              {applicationDetail.status === "rejected"
                ? "已拒绝"
                : ["passed", "accepted", "declined"].includes(
                    applicationDetail.status
                  )
                ? "已通过"
                : "审核中"}
            </IonText>
          </IonItem>

          <IonListHeader>
            <h5>申请对象：</h5>
          </IonListHeader>
          <OrgCard info={applicationDetail.orgInfo} interactive={true} />

          <IonListHeader>
            <h5>通知：</h5>
          </IonListHeader>
          {applicationDetail.notifications.length ? (
            applicationDetail.notifications.map((notification) => (
              <NotificationItem
                info={notification}
                showUnread={true}
                routerLink={`${applicationId}/${notification.id}`}
              />
            ))
          ) : (
            <IonItem lines={"none"}>
              <IonLabel>无</IonLabel>
            </IonItem>
          )}

          {applicationDetail.departmentInfo ? (
            <>
              <IonListHeader style={{ marginBottom: "-4px", marginTop: "8px" }}>
                <h5>申请部门：</h5>
              </IonListHeader>
              <IonItem lines={"none"}>
                <IonLabel> {applicationDetail.departmentInfo.name} </IonLabel>
              </IonItem>
            </>
          ) : null}
        </IonList>

        {applicationDetail.status === "passed" ? (
          <div>
            <div style={{ height: "10vh" }} />
            <div
              style={{
                position: "fixed",
                width: "100%",
                bottom: "15px",
                background: "white",
                padding: "0 3vw",
              }}
            >
              <div
                style={{
                  textAlign: "center",
                  color: "var(--ion-color-primary)",
                  marginBottom: "5px",
                }}
              >
                七天内未做出选择，邀请自动失效
              </div>
              <IonRow>
                <IonCol>
                  <IonButton
                    onClick={() => {
                      setLoading(true);
                      respondToApplication({
                        applicationId: applicationDetail.id,
                        action: "accept",
                      }).then(() => {
                        setLoading(false);
                      });
                    }}
                    color="primary"
                    expand="block"
                    disabled={loading}
                  >
                    加入
                  </IonButton>
                </IonCol>

                <IonCol>
                  <IonButton
                    onClick={() => {
                      setLoading(true);
                      respondToApplication({
                        applicationId: applicationDetail.id,
                        action: "decline",
                      }).then(() => {
                        setLoading(false);
                      });
                    }}
                    color="primary"
                    expand="block"
                    fill="outline"
                    disabled={loading}
                  >
                    拒绝
                  </IonButton>
                </IonCol>
              </IonRow>
            </div>
          </div>
        ) : applicationDetail.status !== "pending" ? (
          <div
            style={{
              position: "fixed",
              width: "100%",
              bottom: "25px",
              fontSize: "200%",
              color: "var(--ion-color-primary)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            {applicationDetail.status === "accepted" ? (
              <>
                <IonIcon icon={checkmarkCircle} />
                <span style={{ marginLeft: "3px" }}>已加入</span>
              </>
            ) : (
              <>
                <IonIcon icon={closeCircle} />
                <span style={{ marginLeft: "3px" }}>已拒绝</span>
              </>
            )}
          </div>
        ) : null}
      </>
    );
  } else {
    content = <div> skeleton </div>;
  }
  return (
    <IonPage>
      <IonHeader>
        <ToolbarWithBackButton title={"加入申请"} />
      </IonHeader>
      <IonContent fullscreen>{content}</IonContent>
    </IonPage>
  );
};

export default () => {
  return (
    <IonPage>
      <IonRouterOutlet>
        <Route
          exact
          path="/org/application/:applicationId"
          component={ApplicationDetail}
        />
        <Route
          path="/org/application/:applicationId/:notificationId"
          component={ApplicantNotificationDetailPage}
        />
      </IonRouterOutlet>
    </IonPage>
  );
};
