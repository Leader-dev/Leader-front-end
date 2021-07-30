import { useOrgPublicInfo } from "@/services/org/manage/publicInfo/get";
import { useOrgTimeline } from "@/services/org/manage/timeline/list";
import { useStartUrl } from "@/services/service/image/accessStartUrl";
import { useUserInfo } from "@/services/user/info/get";
import {
  IonBackButton,
  IonButton,
  IonButtons,
  IonCol,
  IonContent,
  IonGrid,
  IonHeader,
  IonIcon,
  IonLabel,
  IonPage,
  IonRow,
  IonSegment,
  IonSegmentButton,
  IonToolbar,
  isPlatform,
} from "@ionic/react";
import {
  alertOutline,
  list,
  listOutline,
  megaphone,
  megaphoneOutline,
  person,
  search,
  searchOutline,
  stopwatch,
  stopwatchOutline,
  alert as alertIcon,
  people,
  today,
  gitCompareOutline,
  reorderFour,
  reader,
  shieldCheckmark,
} from "ionicons/icons";
import * as React from "react";
import { useState } from "react";
import { useParams } from "react-router";
import { Link } from "react-router-dom";

const Item = ({
  name,
  icon,
  link,
  background,
}: {
  name: string;
  icon: string;
  link?: string;
  background?: string;
}) => {
  return (
    <IonCol style={{ textAlign: "center", padding: "16px" }} size="3">
      <Link
        to={link || "/"}
        style={{ textDecoration: "none", color: "inherit" }}
      >
        <div
          style={{
            borderRadius: "12px",
            background: background ?? "var(--ion-color-primary)",
            aspectRatio: "1/1",
            display: "flex",
            marginBottom: "6px",
            padding: "8px",
          }}
        >
          <IonIcon
            icon={icon}
            style={{
              color: "white",
              margin: "auto",
              fontSize: "180%",
            }}
          />
        </div>
        <span style={{ fontSize: "85%", margin: "0 -4px" }}>{name}</span>
      </Link>
    </IonCol>
  );
};

export default () => {
  const { orgId } = useParams<{ orgId: string }>();
  const { data: startUrl } = useStartUrl();
  const { data: orgDetails } = useOrgPublicInfo({ orgId });
  const { data: userInfo } = useUserInfo();
  const [tab, setTab] = useState<"user" | "manage">("user");
  const { data: timeline } = useOrgTimeline({ orgId });
  const isIos = isPlatform("ios");
  console.log({ orgDetails, startUrl });
  return (
    <IonPage>
      <IonContent>
        <div style={{ position: "relative", color: "white" }}>
          <IonToolbar
            style={{ justifyContent: "space-between", "--background": "none" }}
          >
            <IonButtons slot="start">
              <IonBackButton
                style={{ width: "38", "--color": "white" }}
                defaultHref="/tabs/management"
                text=""
              />
            </IonButtons>
            {isIos && (
              <IonSegment
                value={tab}
                style={{
                  "--background": "rgba(146, 148, 156, 0.8)",
                }}
                onIonChange={(e) => {
                  setTab(e.detail.value as "user" | "manage");
                }}
              >
                <IonSegmentButton value="user">
                  <IonLabel>成员功能</IonLabel>
                </IonSegmentButton>
                <IonSegmentButton value="manage">
                  <IonLabel>社团管理</IonLabel>
                </IonSegmentButton>
              </IonSegment>
            )}
            <IonButtons slot="end">
              <IonButton style={{ width: "38" }}>
                <IonIcon style={{ color: "white" }} icon={person} />
              </IonButton>
            </IonButtons>
          </IonToolbar>
          <img
            src={`${startUrl}${
              orgDetails?.posterUrl || "v1_ipNqlAbA7NJpPjS8ay2KRiwKeoSuTz4h"
            }`}
            style={{
              top: 0,
              zIndex: -1,
              filter: "brightness(50%)",
              position: "absolute",
              width: "100%",
              height: "100%",
              objectFit: "cover",
            }}
          />
          <div style={{ padding: "46px", textAlign: "center" }}>
            <h3>{orgDetails?.name}</h3>
          </div>
          <div
            style={{ padding: "8px", fontSize: "120%", textAlign: "center" }}
          >
            {userInfo?.nickname}
          </div>
          <div style={{ padding: "8px", fontSize: "70%", textAlign: "center" }}>
            {userInfo?.uid}
          </div>
        </div>
        {!isIos && (
          <IonSegment
            value={tab}
            onIonChange={(e) => {
              setTab(e.detail.value as "user" | "manage");
            }}
          >
            <IonSegmentButton value="user">
              <IonLabel>成员功能</IonLabel>
            </IonSegmentButton>
            <IonSegmentButton value="manage">
              <IonLabel>社团管理</IonLabel>
            </IonSegmentButton>
          </IonSegment>
        )}
        {tab === "user" ? (
          <div>
            <div>
              <div
                style={{
                  padding: "12px",
                  display: "flex",
                  alignItems: "center",
                }}
              >
                <span
                  style={{
                    fontSize: "175%",
                    fontWeight: "bold",
                    margin: "8px",
                  }}
                >
                  时间线
                </span>
                <IonButton fill="outline" size="small">
                  查看全部
                </IonButton>
              </div>
              <div style={{ textAlign: "center" }}>
                <div>距离</div>
                <div>还有</div>
              </div>
            </div>
            <IonGrid style={{ gap: "1rem" }}>
              <IonRow>
                <Item name="公告" icon={megaphone} />
                <Item name="任务" icon={list} />
                <Item name="考勤" icon={stopwatch} />
                <Item name="请假" icon={today} />
                <Item name="社员" icon={people} link="members" />
              </IonRow>
            </IonGrid>
          </div>
        ) : (
          <div>
            <IonGrid style={{ gap: "1rem" }}>
              <IonRow>
                <Item name="公告管理" icon={megaphone} background="#5bc44c" />
                <Item name="任务管理" icon={list} background="#5bc44c" />
                <Item name="考勤管理" icon={stopwatch} background="#5bc44c" />
                <Item name="请假管理" icon={today} background="#5bc44c" />
                <Item
                  name="时间线管理"
                  icon={reorderFour}
                  background="#5bc44c"
                />
                <Item
                  name="招新管理"
                  icon={people}
                  link="recruit"
                  background="#5bc44c"
                />
              </IonRow>
              <IonRow>
                <Item
                  name="转移本人权限"
                  icon={gitCompareOutline}
                  background="#434343"
                />
                <Item
                  name="架构与成员"
                  icon={people}
                  link="manage-members"
                  background="#434343"
                />
                <Item name="对外资料" icon={reader} background="#434343" />
                <Item
                  name="核心认证"
                  icon={shieldCheckmark}
                  background="#434343"
                />
              </IonRow>
            </IonGrid>
          </div>
        )}
      </IonContent>
    </IonPage>
  );
};
