import {
  IonButton,
  IonButtons,
  IonFab,
  IonFabButton,
  IonIcon,
  IonPage,
  IonRefresher,
  IonRefresherContent,
  useIonModal,
} from "@ionic/react";
import { mutateMany } from "swr-mutate-many";

import "./index.css";
import { add, personCircleOutline } from "ionicons/icons";
import { RefresherEventDetail } from "@ionic/core";
import React, { useState } from "react";

import { TitledSearchBarWrapper } from "@/components/titledSearchbarWrapper";

import MomentCard, { MomentInfo } from "./Component/MomentCard";

import MomentCardSkeleton from "./Component/MomentCardSkeleton";
import TopMomentItemSkeleton from "./Component/TopMomentItemSkeleton";
import { Route, RouteComponentProps } from "react-router-dom";
import { useTrendList } from "@/services/trend/list";

interface TrendsProps extends RouteComponentProps {}

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
        <MomentCard info={info} />
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
        noTopTitle={true}
        title={"动态"}
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
