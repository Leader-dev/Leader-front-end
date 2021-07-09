import * as React from "react";
import {
  IonContent,
  IonHeader,
  IonToolbar,
  IonPage,
  IonSearchbar,
  IonButtons,
  IonButton,
  IonSlides,
  IonIcon,
  IonText,
} from "@ionic/react";
import "./index.css";
import { filterCircleSharp, filterOutline } from "ionicons/icons";
import { OrganizationInfo } from "./Component/OrganizationInfoCard";
import TopAdvertisement, {
  AdvertisementInfo,
} from "./Component/TopAdvertisement";
import TopAdvertisementSkeleton from "./Component/TopAdvertisementSkeleton";
import { RefresherEventDetail } from "@ionic/core";
import ECARecommend from "./Component/RecommendOrganization";
import ECARecommendSkeleton from "./Component/RecommendOrganizationSkeleton";

interface ECADisplayState {
  loadingFirst: boolean;
  ecaRecommend: OrganizationInfo[];
  advertisement: AdvertisementInfo[];
  searchText: string;
}

class ECADisplay extends React.Component<any, ECADisplayState> {
  async fetchData() {
    return new Promise<void>((r) => {
      setTimeout(() => {
        this.setState(
          {
            ecaRecommend: [
              {
                id: "xxx",
                posterUrl:
                  "https://tva1.sinaimg.cn/large/008i3skNgy1gqnjj5kw0mj306v0bc753.jpg",
                name: "这是一个社团",
                numberId: 400031,
                memberCount: 35,
                instituteName: "深圳国际交流学院",
              },
              {
                id: "xxx",
                posterUrl:
                  "https://tva1.sinaimg.cn/large/008i3skNgy1gqnjj5kw0mj306v0bc753.jpg",
                name: "这是一个社团",
                numberId: 400032,
                memberCount: 35,
                instituteName: "深圳国际交流学院",
              },
              {
                id: "xxx",
                posterUrl:
                  "https://tva1.sinaimg.cn/large/008i3skNgy1gqnjj5kw0mj306v0bc753.jpg",
                name: "这是一个社团",
                numberId: 400033,
                memberCount: 35,
                instituteName: "深圳国际交流学院",
              },
              {
                id: "xxx",
                posterUrl: "http://placekitten.com/g/200/300",
                name: "这是一个社团",
                numberId: 400034,
                memberCount: 35,
                instituteName: "深圳国际交流学院",
              },
              {
                id: "xxx",
                posterUrl: "http://placekitten.com/g/200/300",
                name: "这是一个社团",
                numberId: 400035,
                memberCount: 35,
                instituteName: "深圳国际交流学院",
              },
              {
                id: "xxx",
                posterUrl: "http://placekitten.com/g/200/300",
                name: "这是一个社团",
                numberId: 400036,
                memberCount: 35,
                instituteName: "深圳国际交流学院",
              },
            ],
            advertisement: [
              {
                id: "xxxxx",
                posterUrl:
                  "https://tva1.sinaimg.cn/large/008i3skNgy1gr2n1qv6o5j30zk0mugx5.jpg",
              },
              {
                id: "xxxxx",
                posterUrl:
                  "https://tva1.sinaimg.cn/large/008i3skNgy1gr2n1qv6o5j30zk0mugx5.jpg",
              },
            ],
          },
          r
        );
      }, 1000);
    });
  }

  setSearchText(searchText: string) {
    this.setState({
      searchText,
    });
  }

  componentWillMount() {
    this.setState({
      loadingFirst: true,
      ecaRecommend: [],
      advertisement: [],
    });
  }

  componentDidMount() {
    this.fetchData().then(() => {
      this.setState({
        loadingFirst: false,
      });
    });
  }

  async refresh(event: CustomEvent<RefresherEventDetail>) {
    await this.fetchData();
    event.detail.complete();
  }

  render() {
    let advertisementList;
    let ecaList;
    let tabBarHeight =
      document.getElementsByTagName("ion-tab-bar")[0].clientHeight;
    if (this.state.loadingFirst) {
      advertisementList = <TopAdvertisementSkeleton />;
      ecaList = <ECARecommendSkeleton tabBarHeight={tabBarHeight} />;
    } else {
      advertisementList = <TopAdvertisement info={this.state.advertisement} />;
      ecaList = (
        <ECARecommend
          info={this.state.ecaRecommend}
          tabBarHeight={tabBarHeight}
          pageNum={2}
        />
      );
    }
    return (
      <IonPage>
        <IonHeader className="ion-no-border">
          <IonToolbar>
            <IonSearchbar
              placeholder="搜索社团"
              value={this.state.searchText}
              onIonChange={(e) => this.setSearchText(e.detail.value!)}
            />
            <IonButtons style={{ marginRight: 8 }} slot="primary">
              <IonButton color="light">
                <IonIcon slot="icon-only" icon={filterOutline} />
              </IonButton>
            </IonButtons>
          </IonToolbar>
        </IonHeader>

        <IonContent fullscreen>
          <div style={{ background: "white" }}>
            <div
              style={{
                background: "#43536D",
                position: "relative",
                paddingTop: "1vh",
                height: "21vh",
              }}
            >
              <svg
                viewBox="0 0 100 75"
                width="100%"
                height="100px"
                preserveAspectRatio="none"
                style={{
                  position: "absolute",
                  marginBottom: "-1px",
                  bottom: 0,
                  display: "block",
                }}
              >
                <path d="M 0 75 S 50 0, 100 75" fill="white" stroke="none" />
              </svg>
              {advertisementList}
            </div>
          </div>

          {ecaList}
        </IonContent>
      </IonPage>
    );
  }
}

export default ECADisplay;
