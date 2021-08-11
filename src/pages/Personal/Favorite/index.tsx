import * as React from "react";
import {
  IonButtons,
  IonContent,
  IonHeader,
  IonLabel,
  IonPage,
  IonSegment,
  IonSegmentButton,
  IonTitle,
  IonToolbar,
  IonBackButton,
  IonImg,
} from "@ionic/react";
import { chevronBack } from "ionicons/icons";
import { useState } from "react";
import { useFavoriteOrg } from "@/services/org/favorite";
import OrgCardSkeleton from "@/pages/Org/components/OrgCardSkeleton";
import OrgCard from "@/pages/Org/components/OrgCard";

export default () => {
  const { data: favoriteOrgs, error: favoriteOrgsErr } = useFavoriteOrg();
  const [tab, setTab] = useState<"org" | "project">("org");

  if (favoriteOrgsErr) return <div>Failed to load</div>;

  const NoFavoriteOrgs = (
    <div style={{ padding: "25vh 15vw" }}>
      <IonImg src={"/assets/icon/no-favorite-orgs.svg"} />
      <div
        style={{
          marginTop: "30px",
          textAlign: "center",
          color: "var(--ion-color-medium)",
        }}
      >
        暂无收藏
      </div>
    </div>
  );

  let content;
  if (!favoriteOrgs) {
    content = (
      <>
        <OrgCardSkeleton />
        <OrgCardSkeleton />
        <OrgCardSkeleton />)
      </>
    );
  } else {
    content =
      tab === "org"
        ? favoriteOrgs.length
          ? favoriteOrgs.map((org) => <OrgCard info={org} interactive={true} />)
          : NoFavoriteOrgs
        : NoFavoriteOrgs;
  }

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            <IonBackButton icon={chevronBack} text="" />
          </IonButtons>
          <IonTitle>我的收藏</IonTitle>
        </IonToolbar>

        <IonToolbar>
          <IonSegment
            // mode="md"
            value={tab}
            onIonChange={(e) => {
              setTab(e.detail.value as "org" | "project");
            }}
          >
            <IonSegmentButton value="org">
              <IonLabel style={{ fontSize: "120%" }}> 社团组织 </IonLabel>
            </IonSegmentButton>
            <IonSegmentButton value="project">
              <IonLabel style={{ fontSize: "120%" }}> 合作项目 </IonLabel>
            </IonSegmentButton>
          </IonSegment>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>{content}</IonContent>
    </IonPage>
  );
};
