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

class T extends React.Component<TrendsProps, TrendsState> {
  async fetchData() {
    // TODO replace this piece of code with real data fetching action
    return new Promise<void>((r) => {
      setTimeout(() => {
        this.setState(
          {
            topMoments: [
              {
                userAvatar: "https://icon.scie.com.cn/user/sicon/s5020_i.jpg",
                username: "张威融",
                userTitle: "社团社长",
                authed: true,
                content:
                  "这家合作是真的不行，从来没有见过这么不负责任的处理方式，取关了",
                upCount: 100,
                upRank: 1,
              },
              {
                userAvatar: "https://icon.scie.com.cn/user/sicon/s5020_i.jpg",
                username: "张威融",
                userTitle: "社团社长",
                content:
                  "这家合作是真的行，合同签订快，资金汇款即使，双方非常愉快，期待再次合作",
                upCount: 30,
                upRank: 2,
              },
              {
                userAvatar: "https://icon.scie.com.cn/user/sicon/s5020_i.jpg",
                username: "张威融",
                userTitle: "社团社长",
                content:
                  "这家合作是真的行，合同签订快，资金汇款即使，双方非常愉快，期待再次合作",
                upCount: 20,
                upRank: 3,
              },
            ],
            moments: [
              {
                userAvatar: "https://icon.scie.com.cn/user/sicon/s5020_i.jpg",
                username: "张威融",
                userTitle: "社团社长",
                authed: true,
                content:
                  "这家合作是真的不行，从来没有见过这么不负责任的处理方式，取关了",
                upCount: 10,
              },
              {
                userAvatar: "https://icon.scie.com.cn/user/sicon/s5020_i.jpg",
                username: "张威融",
                userTitle: "社团社长",
                content:
                  "这家合作是真的行，合同签订快，资金汇款即使，双方非常愉快，期待再次合作",
                upCount: 20,
              },
              {
                userAvatar: "https://icon.scie.com.cn/user/sicon/s5020_i.jpg",
                username: "张威融",
                userTitle: "社团社长",
                content:
                  "这家合作是真的行，合同签订快，资金汇款即使，双方非常愉快，期待再次合作",
                upCount: 20,
              },
              {
                userAvatar: "https://icon.scie.com.cn/user/sicon/s5020_i.jpg",
                username: "张威融",
                userTitle: "社团社长",
                content:
                  "这家合作是真的行，合同签订快，资金汇款即使，双方非常愉快，期待再次合作",
                upCount: 20,
              },
              {
                userAvatar: "https://icon.scie.com.cn/user/sicon/s5020_i.jpg",
                username: "张威融",
                userTitle: "社团社长",
                content:
                  "这家合作是真的行，合同签订快，资金汇款即使，双方非常愉快，期待再次合作",
                upCount: 20,
              },
              {
                userAvatar: "https://icon.scie.com.cn/user/sicon/s5020_i.jpg",
                username: "张威融",
                userTitle: "社团社长",
                content:
                  "这家合作是真的行，合同签订快，资金汇款即使，双方非常愉快，期待再次合作",
                upCount: 20,
              },
            ],
          },
          r
        );
      }, 1000);
    });
  }

  componentWillMount() {
    this.setState({
      loadingFirstTime: true,
      searchText: "",
      topMoments: [],
      moments: [],
    });
  }

  componentDidMount() {
    this.fetchData().then(() => {
      this.setState({
        loadingFirstTime: false,
      });
    });
  }

  async refresh(event: CustomEvent<RefresherEventDetail>) {
    await this.fetchData();
    event.detail.complete();
  }

  setSearchText(searchText: string) {
    this.setState({
      searchText,
    });
  }

  render() {
    // render skeleton instead of data if loading the first time
    let topItemList: any[], cardList: any[];
    if (this.state.loadingFirstTime) {
      topItemList = [
        <TopMomentItemSkeleton rank={1} />,
        <TopMomentItemSkeleton rank={2} />,
        <TopMomentItemSkeleton rank={3} />,
      ];
      cardList = [
        <MomentCardSkeleton />,
        <MomentCardSkeleton />,
        <MomentCardSkeleton />,
      ];
    } else {
      topItemList = this.state.topMoments.map((info) => (
        <TopMomentItem info={info} />
      ));
      // TODO use of searchText here is just a demo, please rewrite to implement actual searching function
      cardList = this.state.moments
        .filter(
          (info) =>
            this.state.searchText == "" ||
            info.content.includes(this.state.searchText)
        )
        .map((info) => <MomentCard info={info} />);
    }
    return (
      <IonPage>
        <TitledSearchBarWrapper
          title="动态"
          searchbarPlaceholder="搜索动态"
          value={this.state.searchText}
          onValueChange={(e) => this.setSearchText(e.detail.value!)}
          rightItems={
            <IonButtons style={{ marginRight: 8 }} slot="primary">
              <IonButton color="primary">
                <IonIcon slot="icon-only" icon={personCircleOutline} />
              </IonButton>
            </IonButtons>
          }
        >
          <IonRefresher
            slot="fixed"
            onIonRefresh={(event) => this.refresh(event)}
          >
            <IonRefresherContent
              pullingIcon="dots"
              refreshingSpinner="circles"
            />
          </IonRefresher>
          <IonCard>
            <IonCardHeader>
              <IonCardTitle>今日最佳</IonCardTitle>
            </IonCardHeader>
            {topItemList}
          </IonCard>
          {cardList}
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
  }
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
            userAvatar: info.puppetInfo.avatarUrl,
            username: info.puppetInfo.nickname,
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
        <IonRefresher
          slot="fixed"
          onIonRefresh={(event) => {
            // refresh
          }}
        >
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
