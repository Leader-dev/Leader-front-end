import { useState } from "react";
import * as React from "react";
import {
  IonFab,
  IonFabButton,
  IonIcon,
  IonLabel,
  IonPage,
  IonSegment,
  IonSegmentButton,
} from "@ionic/react";
import "./index.css";
import { TitledSearchBarWrapper } from "@/components/titledSearchbarWrapper";
import { ECACard, ECARequestCard } from "./components/ecaLink";
import { useJoinedOrgList } from "@/services/org/joined";
import { add } from "ionicons/icons";
import { useMyApplicationList } from "@/services/org/apply/list";

const Management: React.FC = () => {
  const [tab, setTab] = useState<"joined" | "apply">("joined");
  const [search, setSearch] = useState("");
  const {
    data: orgList,
    error: orgError,
    isValidating: orgValidating,
  } = useJoinedOrgList();
  const {
    data: applicationList,
    error: applicationError,
    isValidating: applicationValidating,
  } = useMyApplicationList();
  const loading =
    (!orgError && orgValidating) ||
    (!applicationError && applicationValidating);
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
        <IonFab
          vertical="bottom"
          horizontal="center"
          style={{ bottom: 16 }}
          slot="fixed"
        >
          <IonFabButton routerLink="/org/create">
            <IonIcon icon={"/assets/icon/add.svg"} />
          </IonFabButton>
        </IonFab>
        {tab === "joined"
          ? loading
            ? null
            : orgList?.map((org) => <ECACard info={org} key={org.id} />)
          : loading
          ? null
          : applicationList?.map((application) => (
              <ECARequestCard
                info={{
                  id: application.id,
                  orgInfo: application.orgInfo,
                  status: application.status,
                  notificationCount: application.unreadCount,
                }}
                key={application.id}
              />
            ))}
      </TitledSearchBarWrapper>
    </IonPage>
  );
};

export default Management;
