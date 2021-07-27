import {
  IonButton,
  IonButtons,
  IonCard,
  IonCardHeader,
  IonCardTitle,
  IonContent,
  IonFab,
  IonFabButton,
  IonHeader,
  IonIcon,
  IonPage,
  IonRefresher,
  IonRefresherContent,
  IonRouterOutlet,
  IonSearchbar,
  IonTitle,
  IonToolbar,
  isPlatform,
} from "@ionic/react";
import { mutateMany } from "swr-mutate-many";

import "./index.css";
import { add, person, personCircleOutline } from "ionicons/icons";
import { RefresherEventDetail } from "@ionic/core";
import React, { useState } from "react";

import { TitledSearchBarWrapper } from "@/components/titledSearchbarWrapper";

import MomentCard, { MomentInfo } from "./Component/MomentCard";
import TopMomentItem, { TopMomentInfo } from "./Component/TopMomentItem";
import MomentCardSkeleton from "./Component/MomentCardSkeleton";
import TopMomentItemSkeleton from "./Component/TopMomentItemSkeleton";
import { Route, RouteComponentProps } from "react-router-dom";
import NewMoment from "./Component/NewMoment";
import { useTrendList } from "@/services/trend/list";

interface TrendsProps extends RouteComponentProps {}

interface TrendsState {
  loadingFirstTime: boolean;
  searchText: string;
  topMoments: TopMomentInfo[];
  moments: MomentInfo[];
}

const Section = ({ page, onNext }: { page: number; onNext?: () => void }) => {
  const { data: cardList, isValidating } = useTrendList({
    pageNumber: page,
    pageSize: 24,
  });

  if (isValidating) {
    return (
      <>
        <MomentCardSkeleton />
        <MomentCardSkeleton />
        <MomentCardSkeleton />
      </>
    );
  }
  if (!cardList) {
    return <>End</>;
  }

  return (
    <>
      {cardList.map((info) => (
        <MomentCard
          info={{
            ...info,
            upCount: info.likeCount,
            userAvatar:
              info.puppetInfo?.avatarUrl ??
              "http://5b0988e595225.cdn.sohucs.com/images/20180702/0a5cab43989c428286a58d5e81cf2445.png",
            username: info.puppetInfo?.nickname ?? "鳞者用户",
            userTitle: info.orgTitle,
          }}
        />
      ))}
    </>
  );
};

const Trends = () => {
  const [searchText, setSearchText] = useState("");
  const [l, setL] = useState(1);

  const onNext = () => {
    setL(l + 1);
  };

  const onRefresh = (event: CustomEvent<RefresherEventDetail>) => {
    // @ts-ignore
    mutateMany((t) => /\/trend\/list/.test(t));
    setL(1);
    event.detail.complete();
  };

  return (
    <IonPage>
      <TitledSearchBarWrapper
        title="动态"
        searchbarPlaceholder="搜索动态"
        value={searchText}
        onValueChange={(e) => setSearchText(e.detail.value!)}
        rightItems={
          <IonButtons style={{ marginRight: 8 }} slot="primary">
            <IonButton color="primary">
              <IonIcon slot="icon-only" icon={personCircleOutline} />
            </IonButton>
          </IonButtons>
        }
      >
        <IonRefresher slot="fixed" onIonRefresh={onRefresh}>
          <IonRefresherContent pullingIcon="dots" refreshingSpinner="circles" />
        </IonRefresher>
        {/* <IonCard>
          <IonCardHeader>
            <IonCardTitle>今日最佳</IonCardTitle>
          </IonCardHeader>
          {topItemList}
        </IonCard> */}
        {Array(l)
          .fill(null)
          .map((_, index) => {
            return (
              <Section
                page={index}
                onNext={index === l - 1 ? onNext : undefined}
              />
            );
          })}
        <div style={{ marginTop: 100 }} />
        <IonFab
          vertical="bottom"
          horizontal="center"
          style={{ bottom: 16 }}
          slot="fixed"
        >
          <IonFabButton routerLink={`/trends/new`}>
            <IonIcon icon={add} />
          </IonFabButton>
        </IonFab>
      </TitledSearchBarWrapper>
    </IonPage>
  );
};

export default Trends;
