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
  IonItem,
  IonLabel,
  IonList,
  IonPage,
  IonRow,
  IonSegment,
  IonSegmentButton,
  IonTitle,
  IonToolbar,
  isPlatform,
  useIonModal,
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
import { useOrgMemberAccess } from "@/services/org/manage/memberInfo/getAccess";
import { clear, time } from "console";
import dayjs from "dayjs";
import ToolbarWithBackButton from "@/components/ToolbarWithBackButton";

const Item = ({
  name,
  icon,
  link,
  background,
  disabled = false,
}: {
  name: string;
  icon: string;
  link?: string;
  background?: string;
  disabled?: boolean;
}) => {
  return (
    <IonCol style={{ textAlign: "center", padding: "16px" }} size="3">
      <Square>
        <IonButton
          disabled={disabled}
          routerLink={link || "/"}
          fill={"clear"}
          style={{
            borderRadius: "12px",
            background: background ?? "var(--ion-color-primary)",
            aspectRatio: "1/1",
            display: "flex",
            marginBottom: "6px",
            padding: "8px",
          }}
        >
          <div>
            <IonIcon
              icon={icon}
              style={{
                color: "white",
                margin: "auto",
                fontSize: "180%",
              }}
            />
          </div>
        </IonButton>
      </Square>
      <div
        style={
          disabled
            ? { color: "gray", fontSize: "85%", margin: "10px 0 0" }
            : { fontSize: "85%", margin: "10px 0 0" }
        }
      >
        {name}
      </div>
    </IonCol>
  );
};

const TimelineModal = ({
  onClose,
  orgId,
}: {
  onClose: () => void;
  orgId: string;
}) => {
  const { data: timeline, mutate } = useOrgTimeline({ orgId });
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="end">
            <IonButton onClick={onClose}>确定</IonButton>
          </IonButtons>
          <IonTitle>时间轴</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent>
        <IonList>
          {timeline?.map((event) => {
            const t = dayjs.unix(event.timestamp);
            const passed = t < dayjs();
            return (
              <IonItem key={event.id}>
                <IonLabel>
                  <h4
                    style={{
                      color: passed ? "#777777" : undefined,
                    }}
                  >
                    {event.description}
                    {passed && " - 已完成"}
                  </h4>

                  <p>{t.format("YYYY年MM月DD号HH点")}</p>
                </IonLabel>
              </IonItem>
            );
          })}
        </IonList>
      </IonContent>
    </IonPage>
  );
};

export default () => {
  const { orgId } = useParams<{ orgId: string }>();
  const { data: startUrl } = useStartUrl();
  const { data: orgDetails } = useOrgDetails({ orgId });
  const { data: userAccess } = useOrgMemberAccess({ orgId });
  const [tab, setTab] = useState<"user" | "manage">("user");
  const { data: timeline } = useOrgTimeline({ orgId });
  let dateDiff, lastEvent;
  if (timeline) {
    const lastTimeline = timeline.slice(-1)[0];
    const lastTime = dayjs.unix(lastTimeline.timestamp);
    const timeNow = dayjs();
    console.log(lastTimeline, timeNow);
    if (lastTime > timeNow) {
      dateDiff = lastTime.diff(timeNow, "day") + " 天";
      lastEvent = lastTimeline.description;
    } else {
      dateDiff = "无";
      lastEvent = "无";
    }
  }

  const [presentNewModal, dismissNewModal] = useIonModal(TimelineModal, {
    onClose: () => {
      dismissNewModal();
    },
    orgId,
  });
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
          <IonSegmentButton value="manage" disabled={!userAccess?.adminPanel}>
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
                <IonButton
                  fill="outline"
                  size="small"
                  onClick={() => presentNewModal()}
                >
                  查看全部
                </IonButton>
              </div>
              <div style={{ textAlign: "center" }}>
                <div>距离 {lastEvent} </div>
                <div>还有 {dateDiff} </div>
              </div>
            </div>
            <IonGrid style={{ gap: "1rem" }}>
              <IonRow>
                <Item name="公告" icon={megaphone} disabled={true} />
                <Item name="任务" icon={list} disabled={true} />
                <Item name="考勤" icon={stopwatch} disabled={true} />
                <Item name="请假" icon={today} disabled={true} />
                <Item name="社员" icon={people} link="members" />
              </IonRow>
            </IonGrid>
          </div>
        ) : (
          <div>
            <IonGrid style={{ gap: "1rem" }}>
              <IonRow style={{ marginBottom: "25px" }}>
                <Item
                  name="公告管理"
                  icon={megaphone}
                  background="#5bc44c"
                  disabled={true}
                />
                <Item
                  name="任务管理"
                  icon={list}
                  background="#5bc44c"
                  disabled={true}
                />
                <Item
                  name="考勤管理"
                  icon={stopwatch}
                  background="#5bc44c"
                  disabled={true}
                />
                <Item
                  name="请假管理"
                  icon={today}
                  background="#5bc44c"
                  disabled={true}
                />
                <Item
                  name="时间线管理"
                  icon={reorderFour}
                  background="#5bc44c"
                  link="timeline"
                />
                <Item
                  name="招新管理"
                  icon={people}
                  link="recruit"
                  background="#FDCC00"
                  disabled={!userAccess?.recruitFunctions}
                />
              </IonRow>
              <IonRow>
                <Item
                  name="转移本人权限"
                  icon={gitCompareOutline}
                  background="#434343"
                  disabled={true}
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
                  disabled={true}
                />
              </IonRow>
            </IonGrid>
          </div>
        )}
      </IonContent>
    </IonPage>
  );
};
