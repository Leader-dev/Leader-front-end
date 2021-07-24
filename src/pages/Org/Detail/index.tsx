import * as React from "react";
import {
  IonButtons,
  IonLabel,
  IonPage,
  IonToolbar,
  IonHeader,
  IonContent,
  IonButton,
  IonIcon,
  IonSegment,
  IonSegmentButton,
  IonBackButton,
} from "@ionic/react";
import "./index.css";
import { chevronBack, heartOutline, warningOutline } from "ionicons/icons";
import { CSSProperties, useState } from "react";
import { useParams } from "react-router";
import { useOrgDetails } from "@/services/org/detail";
import OrgDetailInfo from "./components/Info";
import OrgDetailContact from "./components/Contact";
import InfoSkeleton from "./components/InfoSkeleton";

export default () => {
  // TODO fetch data from backend
  const { orgId } = useParams<{ orgId: string }>();
  const { data: orgDetail, error } = useOrgDetails({ orgId });
  const [tab, setTab] = useState<"info" | "contact">("info");

  let orgContent, backgroundUrl;
  if (error) {
    // Test data
    let orgTest = {
      detail: {
        id: "xxxxxx",
        name: "计算机协会",
        numberId: 111111,
        introduction:
          "计算机协会成⽴于2004年10⽉10⽇，是学院最具潜⼒的学⽣社团之⼀，也是学院唯⼀⼀个科技类社团。协会是由⼴⼤的电脑爱好者⾃发组成，以“学习计算机知识，提⾼⾃⾝素质，相互帮助，团结协作”为宗旨，以“先进带动后进， 刻苦钻研计算机知识，勇攀IT科技⾼峰”为原则。积极⼤胆地⾛进计算机各个领域，不断总结交流，树⽴良好的计算机知识氛围，全⾯提⾼我院⼴⼤计算机爱好者们的计算机知识⽔平。",
        memberCount: 280,
        instituteName: "深国交",
        address: "广东深圳",
        instituteAuth: "school",
        typeAliases: [""],
        posterUrl:
          "https://tva1.sinaimg.cn/large/008i3skNgy1gsbsxdsc4ij30a006rjrp.jpg",
        status: "",
        phone: ["113115155", "189237523465"],
        email: ["aaaaa@gmail.com", "test@qq.com"],
        presidentName: "正在讲",
        applicationScheme: {
          open: false,
          auth: true,
          appointDepartment: true,
          questions: [
            { question: "question1", required: true },
            { question: "question2", required: false },
          ],
        },
      },
      applicationStatus: "available",
    };
    if (tab === "info") {
      orgContent = <OrgDetailInfo info={orgTest} />;
    } else {
      orgContent = <OrgDetailContact info={orgTest} />;
    }
    backgroundUrl = orgTest.detail.posterUrl;
  } else {
    if (!orgDetail) {
      orgContent = <InfoSkeleton />;
      backgroundUrl =
        "https://tva1.sinaimg.cn/large/008i3skNgy1gsbsxdsc4ij30a006rjrp.jpg";
    } else {
      if (tab === "info") {
        orgContent = <OrgDetailInfo info={orgDetail} />;
      } else {
        orgContent = <OrgDetailContact info={orgDetail} />;
      }
      backgroundUrl = orgDetail.detail.posterUrl;
    }
  }

  return (
    <IonPage>
      <IonHeader
        style={{
          backgroundImage: 'url("' + backgroundUrl + '")',
          height: "80vw",
        }}
      >
        <div
          style={{
            height: "100%",
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
          }}
        >
          <IonToolbar className="transparent-toolbar">
            <IonButtons slot="start">
              <IonBackButton text="" color="light" icon={chevronBack} />
            </IonButtons>
            <IonButtons slot="end">
              <IonButton color="light">
                <IonIcon slot="icon-only" icon={heartOutline} />
              </IonButton>
              <IonButton color="light">
                <IonIcon slot="icon-only" icon={warningOutline} />
              </IonButton>
            </IonButtons>
          </IonToolbar>

          <IonToolbar className="rounded-toolbar">
            <IonSegment
              mode="md"
              value={tab}
              onIonChange={(e) => {
                setTab(e.detail.value as "info" | "contact");
              }}
            >
              <IonSegmentButton value="info">
                <IonLabel style={{ fontSize: "120%" }}> 详细信息 </IonLabel>
              </IonSegmentButton>
              <IonSegmentButton value="contact">
                <IonLabel style={{ fontSize: "120%" }}> 对外联络 </IonLabel>
              </IonSegmentButton>
            </IonSegment>
          </IonToolbar>
        </div>
      </IonHeader>

      <IonContent fullscreen>
        <div style={{ width: "100%", height: "100%", padding: "5px 20px" }}>
          {orgContent}
        </div>
      </IonContent>
    </IonPage>
  );
};
