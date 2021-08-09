import * as React from "react";
import {
  IonBadge,
  IonButton,
  IonCol,
  IonContent,
  IonHeader,
  IonIcon,
  IonItem,
  IonLabel,
  IonList,
  IonListHeader,
  IonNote,
  IonPage,
  IonRouterOutlet,
  IonRow,
  IonText,
} from "@ionic/react";
import ToolbarWithBackButton from "@/components/ToolbarWithBackButton";
import { useParams } from "react-router";
import { useApplicationDetail } from "@/services/org/apply/detail";
import {
  checkmarkCircle,
  chevronForward,
  closeCircle,
  ellipse,
} from "ionicons/icons";
import OrgCard from "@/pages/Org/components/OrgCard";
import { useState } from "react";
import { respondToApplication } from "@/services/org/apply/reply";
import { Route } from "react-router-dom";

interface NotificationOverview {
  title: string;
  id: string;
  sendDate: number;
  unread: boolean;
}

const NotificationItem = ({ info }: { info: NotificationOverview }) => {
  return (
    <IonItem
      button
      detailIcon={chevronForward}
      key={info.id}
      routerLink={`${info.id}`}
    >
      <IonLabel>
        <h5>{info.title}</h5>
        {new Date(info.sendDate).toLocaleDateString()}
      </IonLabel>
      {info.unread ? (
        <IonNote slot={"end"}>
          <IonIcon
            color={"danger"}
            style={{ fontSize: "120%" }}
            icon={ellipse}
          />
        </IonNote>
      ) : null}
    </IonItem>
  );
};

const ApplicationDetail = () => {
  const { applicationId } = useParams<{ applicationId: string }>();
  const { data: applicationDetail } = useApplicationDetail(applicationId);
  const [loading, setLoading] = useState(false);

  let content;
  if (applicationDetail) {
    content = (
      <>
        <IonList>
          <div style={{ textAlign: "center" }}>
            <h6>加入申请</h6>
          </div>
          <IonItem lines={"none"}>
            申请时间：
            <IonText color={"primary"}>
              {new Date(applicationDetail.sendDate).toLocaleDateString()}
            </IonText>
          </IonItem>

          <IonItem lines={"none"}>
            申请状态：
            <IonText
              color={
                applicationDetail.status === "rejected"
                  ? "danger"
                  : applicationDetail.status === "passed"
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
                : applicationDetail.status === "passed"
                ? "已通过"
                : "审核中"}
            </IonText>
          </IonItem>

          <IonListHeader>
            <h5>申请对象：</h5>
          </IonListHeader>
          <OrgCard info={applicationDetail.orgInfo} interactive={false} />

          <IonListHeader>
            <h5>通知：</h5>
          </IonListHeader>
          {applicationDetail.notifications.length ? (
            applicationDetail.notifications.map((notification) => (
              <NotificationItem info={notification} />
            ))
          ) : (
            <IonItem lines={"none"}>
              <IonLabel>无</IonLabel>
            </IonItem>
          )}

          <IonListHeader>
            <h5>申请部门：</h5>
          </IonListHeader>
          <IonItem lines={"none"}>
            <IonLabel> {applicationDetail.departmentInfo.name} </IonLabel>
          </IonItem>
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
                三天内未作出选择将自动视为拒绝
              </div>
              <div style={{ display: "flex" }}>
                <IonButton
                  style={{ width: "50%", flexGrow: 1, marginRight: "1vw" }}
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
                <IonButton
                  style={{ width: "50%", flexGrow: 1, marginLeft: "1vw" }}
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
              </div>
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
                <IonText>已加入</IonText>
              </>
            ) : (
              <>
                <IonIcon icon={closeCircle} />
                <IonText>已拒绝</IonText>
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
          path={"/org/application/:applicationId"}
          component={ApplicationDetail}
        />
      </IonRouterOutlet>
    </IonPage>
  );
};
