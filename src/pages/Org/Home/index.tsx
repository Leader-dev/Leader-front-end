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
import { Square } from "@/components/square";
import { useOrgDetails } from "@/services/org/detail";

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
      <Square>
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
      </Square>
    </IonCol>
  );
};

export default () => {
  const { orgId } = useParams<{ orgId: string }>();
  const { data: startUrl } = useStartUrl();
  const { data: orgDetails } = useOrgDetails({ orgId });
  const { data: userInfo } = useUserInfo(); // TODO useMemberInfo
  const [tab, setTab] = useState<"user" | "manage">("user");
  const { data: timeline } = useOrgTimeline({ orgId });
  const isIos = isPlatform("ios");
  console.log({ orgDetails, startUrl });
  return (
    <IonPage>
      <IonHeader style={{ height: "65vw" }}>
        <div style={{ color: "white", position: "relative", height: "100%" }}>
          <IonToolbar
            style={{ "--background": "none", "--border-style": "none" }}
          >
            <IonButtons slot="start">
              <IonBackButton
                style={{ width: "38", "--color": "white" }}
                defaultHref="/tabs/management"
                text=""
              />
            </IonButtons>
            <IonButtons slot="end">
              <IonButton style={{ width: "38" }}>
                <IonIcon style={{ color: "white" }} icon={person} />
              </IonButton>
            </IonButtons>
          </IonToolbar>
          <img
            src={`${startUrl}${
              orgDetails?.detail.posterUrl ||
              "v1_ipNqlAbA7NJpPjS8ay2KRiwKeoSuTz4h"
            }`}
            style={{
              top: 0,
              zIndex: -1,
              filter: "brightness(50%)",
              position: "absolute",
              width: "100vw",
              height: "65vw",
              objectFit: "cover",
            }}
          />
          <div
            style={{
              position: "absolute",
              top: "38%",
              width: "100%",
              textAlign: "center",
            }}
          >
            <h3>{orgDetails?.detail.name}</h3>
          </div>
          <div
            style={{
              position: "absolute",
              bottom: "30px",
              width: "100%",
              fontSize: "120%",
              textAlign: "center",
            }}
          >
            {orgDetails?.detail.presidentName}
          </div>
          <div
            style={{
              position: "absolute",
              bottom: "10px",
              width: "100%",
              fontSize: "85%",
              textAlign: "center",
            }}
          >
            {orgDetails?.detail.numberId}
          </div>
        </div>
      </IonHeader>
      <IonContent fullscreen>
        <IonSegment
          mode={"md"}
          value={tab}
          onIonChange={(e) => {
            setTab(e.detail.value as "user" | "manage");
          }}
        >
          <IonSegmentButton value="user">
            <IonLabel style={{ fontSize: "120%" }}>成员功能</IonLabel>
          </IonSegmentButton>
          <IonSegmentButton value="manage">
            <IonLabel style={{ fontSize: "120%" }}>社团管理</IonLabel>
          </IonSegmentButton>
        </IonSegment>
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
              <IonRow style={{ marginBottom: "25px" }}>
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
                <Item
                  name="对外资料"
                  icon={reader}
                  background="#434343"
                  link="public-info"
                />
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
