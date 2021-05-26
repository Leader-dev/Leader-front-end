import React, { useState } from "react";
import {
  IonContent,
  IonHeader,
  IonToolbar,
  IonPage,
  IonSearchbar,
  IonButtons,
  IonButton,
  IonTitle,
  IonSlides,
  IonSlide,
  IonIcon,
} from "@ionic/react";
import "./index.css";
import { filterCircleSharp } from "ionicons/icons";
import ECAInfoCard, { ECAInfo } from "./Component/ECAInfoCard";

interface ECADisplayState {
  loadingFirst: boolean;
  eca: ECAInfo[];
  searchText: string;
}

class ECADisplay extends React.Component<any, ECADisplayState> {
  async fetchData() {
    return new Promise<void>((r) => {
      setTimeout(() => {
        this.setState(
          {
            loadingFirst: false,
            eca: [
              {
                poster:
                  "https://tva1.sinaimg.cn/large/008i3skNgy1gqnjj5kw0mj306v0bc753.jpg",
                name: "这是一个社团",
                id: 400031,
                memberNum: 35,
                address: "深圳国际交流学院",
              },
              {
                poster:
                  "https://tva1.sinaimg.cn/large/008i3skNgy1gqnjj5kw0mj306v0bc753.jpg",
                name: "这是一个社团",
                id: 400032,
                memberNum: 35,
                address: "深圳国际交流学院",
              },
              {
                poster:
                  "https://tva1.sinaimg.cn/large/008i3skNgy1gqnjj5kw0mj306v0bc753.jpg",
                name: "这是一个社团",
                id: 400033,
                memberNum: 35,
                address: "深圳国际交流学院",
              },
              {
                poster: "http://placekitten.com/g/200/300",
                name: "这是一个社团",
                id: 400034,
                memberNum: 35,
                address: "深圳国际交流学院",
              },
              {
                poster: "http://placekitten.com/g/200/300",
                name: "这是一个社团",
                id: 400035,
                memberNum: 35,
                address: "深圳国际交流学院",
              },
              {
                poster: "http://placekitten.com/g/200/300",
                name: "这是一个社团",
                id: 400036,
                memberNum: 35,
                address: "深圳国际交流学院",
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
      eca: [],
    });
  }

  componentDidMount() {
    this.fetchData().then();
  }

  render() {
    let ecaList = [];
    let tabBarHeight =
      document.getElementsByTagName("ion-tab-bar")[0].clientHeight;
    if (!this.state.loadingFirst) {
      for (let i = 0; i < 2; i++) {
        ecaList.push(
          <IonSlide>
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "50% 50%",
                gridGap: "10px",
                paddingRight: "10vw",
              }}
            >
              <div
                style={{
                  gridColumn: 1,
                  gridRow: "1 / 3",
                }}
              >
                <ECAInfoCard info={this.state.eca[3 * i]} size="large" />
              </div>
              <div
                style={{
                  gridColumn: 2,
                  gridRow: 1,
                }}
              >
                <ECAInfoCard info={this.state.eca[3 * i + 1]} size="small" />
              </div>
              <div
                style={{
                  gridColumn: 2,
                  gridRow: 2,
                  marginTop: "-4.2vh",
                }}
              >
                <ECAInfoCard info={this.state.eca[3 * i + 2]} size="small" />
              </div>
            </div>
          </IonSlide>
        );
      }
    }
    return (
      <IonPage>
        <IonHeader>
          <IonToolbar>
            <IonTitle>社团展示</IonTitle>
          </IonToolbar>
          <IonToolbar>
            <IonSearchbar
              placeholder="搜索社团"
              value={this.state.searchText}
              onIonChange={(e) => this.setSearchText(e.detail.value!)}
            />
            <IonButtons style={{ marginRight: 8 }} slot="primary">
              <IonButton color="primary">
                <IonIcon slot="icon-only" icon={filterCircleSharp} />
              </IonButton>
            </IonButtons>
          </IonToolbar>
        </IonHeader>

        <IonContent>
          <div
            style={{
              borderTopLeftRadius: "25px",
              borderTopRightRadius: "25px",
              boxShadow: "0 -4px 6px -1px lightgrey",
              position: "fixed",
              bottom: tabBarHeight + "px",
              left: 0,
              right: 0,
            }}
          >
            <div>test</div>
            <IonSlides
              pager={true}
              options={{
                initialSlide: 1,
              }}
              scrollbar={true}
            >
              {ecaList}
            </IonSlides>
          </div>
        </IonContent>
      </IonPage>
    );
  }
}

export default ECADisplay;
