import { useState } from "react";
import * as React from "react";
import {
  IonContent,
  IonHeader,
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
        {tab === "joined" ? (
          loading ? null : (
            orgList?.map(
              ({
                name,
                id,
                numberId,
                posterUrl,
                addressAuth,
                address,
                memberCount,
                presidentName,
              }) => {
                return (
                  <ECACard
                    name={name}
                    numberId={numberId}
                    imgUrl={posterUrl}
                    addressAuth={addressAuth}
                    address={address}
                    memberCount={memberCount}
                    presidentName={presidentName}
                    notificationCount={0}
                    id={id}
                    key={id}
                  />
                );
              }
            )
          )
        ) : (
          <>
            <ECARequestCard
              name="Leader 开发组"
              numberId={114514}
              imgUrl="https://www.baidu.com/img/flexible/logo/pc/result.png"
              addressAuth="school"
              address="深圳国际交流学院"
              memberCount={1919}
              presidentName="米老鼠"
              notificationCount={3}
              status="pending"
            />
            <ECARequestCard
              name="Leader 开发组"
              numberId={114514}
              imgUrl="https://www.baidu.com/img/flexible/logo/pc/result.png"
              addressAuth="school"
              address="深圳国际交流学院"
              memberCount={1919}
              presidentName="米老鼠"
              notificationCount={3}
              status="accepted"
            />
            <ECARequestCard
              name="Leader 开发组"
              numberId={114514}
              imgUrl="https://www.baidu.com/img/flexible/logo/pc/result.png"
              addressAuth="school"
              address="深圳国际交流学院"
              memberCount={1919}
              presidentName="米老鼠"
              notificationCount={3}
              status="rejected"
            />
            <ECARequestCard
              name="Leader 开发组"
              numberId={114514}
              imgUrl="https://www.baidu.com/img/flexible/logo/pc/result.png"
              addressAuth="school"
              address="深圳国际交流学院"
              memberCount={1919}
              presidentName="米老鼠"
              notificationCount={3}
              status="rejected"
            />
            <ECARequestCard
              name="Leader 开发组"
              numberId={114514}
              imgUrl="https://www.baidu.com/img/flexible/logo/pc/result.png"
              addressAuth="school"
              address="深圳国际交流学院"
              memberCount={1919}
              presidentName="米老鼠"
              notificationCount={3}
              status="rejected"
            />
          </>
        )}
      </TitledSearchBarWrapper>
    </IonPage>
  );
};

export default Management;
