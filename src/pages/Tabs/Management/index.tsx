import { useState } from "react";
import * as React from "react";
import {
  IonContent,
  IonFab,
  IonFabButton,
  IonHeader,
  IonIcon,
  IonLabel,
  IonPage,
  IonSegment,
  IonSegmentButton,
  IonTitle,
  IonToolbar,
} from "@ionic/react";
import "./index.css";
import { TitledSearchBarWrapper } from "@/components/titledSearchbarWrapper";

import { ECACard, ECARequestCard } from "./components/ecaLink";
import { useJoinedOrgList } from "@/services/org/joined";
import { add } from "ionicons/icons";

const Management: React.FC = () => {
  const [tab, setTab] = useState<"joined" | "apply">("joined");
  const [search, setSearch] = useState("");
  const { data: orgList, error, isValidating } = useJoinedOrgList();
  const loading = !error && isValidating;
  return (
    <IonPage>
      <TitledSearchBarWrapper
        title="社团管理"
        searchbarPlaceholder="请输入您想查找的社团组织关键词"
        rightItems={<></>}
        value={search}
        onValueChange={(e) => {
          setSearch(e.detail.value!);
        }}
        noTopTitle
        layer={
          <IonSegment
            value={tab}
            onIonChange={(e) => {
              setTab(e.detail.value as "joined" | "apply");
            }}
          >
            <IonSegmentButton value="joined">
              <IonLabel>我加入的</IonLabel>
            </IonSegmentButton>
            <IonSegmentButton value="apply">
              <IonLabel>加入申请</IonLabel>
            </IonSegmentButton>
          </IonSegment>
        }
      >
        <IonFab vertical="bottom" horizontal="center" slot="fixed">
          <IonFabButton routerLink="/org/create">
            <IonIcon icon={add} />
          </IonFabButton>
        </IonFab>
        {tab === "joined"
          ? loading
            ? null
            : orgList?.map((org) => {
                if (org.status === "joined") {
                  return <ECACard info={org} key={org.id} />;
                }
              })
          : // <>
          //   <ECARequestCard
          //     info={{
          //       id: "",
          //       name: "Leader 开发组",
          //       numberId: 114514,
          //       posterUrl: "v1_9w8xDVon5GnbCHCAPxVLLWPPowdXILcJ",
          //       instituteName: "深圳国际交流学院",
          //       instituteAuth: "school",
          //       memberCount: 1919,
          //       presidentName: "米老鼠",
          //       notificationCount: 3,
          //       status: "pending",
          //       typeAliases: [],
          //     }}
          //   />
          // </>
          loading
          ? null
          : orgList?.map((org) => {
              if (org.status !== "joined") {
                return <ECACard info={org} key={org.id} />;
              }
            })}
      </TitledSearchBarWrapper>
    </IonPage>
  );
};

export default Management;
