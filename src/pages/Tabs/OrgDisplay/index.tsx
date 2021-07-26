import * as React from "react";
import {
  IonContent,
  IonHeader,
  IonToolbar,
  IonPage,
  IonSearchbar,
  IonButtons,
  IonButton,
  IonIcon,
} from "@ionic/react";
import "./index.css";
import { filterOutline } from "ionicons/icons";
import TopAdvertisement from "./Component/TopAdvertisement";
import TopAdvertisementSkeleton from "./Component/TopAdvertisementSkeleton";
import RecommendOrganization from "./Component/RecommendOrganization";
import RecommendOrganizationSkeleton from "./Component/RecommendOrganizationSkeleton";
import { useHomeOrg } from "@/services/org/home";

export default () => {
  // fetch data from back end
  const { data: homeInfo, error } = useHomeOrg();
  let adList, orgList;
  if (error) {
    // Test Data
    let list = [
        {
          id: "xxx",
          posterUrl:
            "https://tva1.sinaimg.cn/large/008i3skNgy1gqnjj5kw0mj306v0bc753.jpg",
          name: "这是一个社团",
          numberId: 400031,
          memberCount: 35,
          instituteName: "深圳国际交流学院",
          instituteAuth: "school",
          typeAliases: [],
          presidentName: "",
        },
        {
          id: "xxx",
          posterUrl:
            "https://tva1.sinaimg.cn/large/008i3skNgy1gqnjj5kw0mj306v0bc753.jpg",
          name: "这是一个社团",
          numberId: 400032,
          memberCount: 35,
          instituteName: "深圳国际交流学院",
          instituteAuth: "school",
          typeAliases: [],
          presidentName: "",
        },
        {
          id: "xxx",
          posterUrl:
            "https://tva1.sinaimg.cn/large/008i3skNgy1gqnjj5kw0mj306v0bc753.jpg",
          name: "这是一个社团",
          numberId: 400033,
          memberCount: 35,
          instituteName: "深圳国际交流学院",
          instituteAuth: "school",
          typeAliases: [],
          presidentName: "",
        },
        {
          id: "xxx",
          posterUrl: "http://placekitten.com/g/200/300",
          name: "这是一个社团",
          numberId: 400034,
          memberCount: 35,
          instituteName: "深圳国际交流学院",
          instituteAuth: "school",
          typeAliases: [],
          presidentName: "",
        },
        {
          id: "xxx",
          posterUrl: "http://placekitten.com/g/200/300",
          name: "这是一个社团",
          numberId: 400035,
          memberCount: 35,
          instituteName: "深圳国际交流学院",
          instituteAuth: "school",
          typeAliases: [],
          presidentName: "",
        },
        {
          id: "xxx",
          posterUrl: "http://placekitten.com/g/200/300",
          name: "这是一个社团",
          numberId: 400036,
          memberCount: 35,
          instituteName: "深圳国际交流学院",
          instituteAuth: "school",
          typeAliases: [],
          presidentName: "",
        },
      ],
      pic = [
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
      ];
    adList = <TopAdvertisement info={pic} />;
    orgList = <RecommendOrganization info={list} />;
  } else {
    if (!homeInfo) {
      adList = <TopAdvertisementSkeleton />;
      orgList = <RecommendOrganizationSkeleton />;
    } else {
      adList = <TopAdvertisement info={homeInfo.pic} />;
      orgList = <RecommendOrganization info={homeInfo.list} />;
    }
  }

  return (
    <IonPage>
      <IonHeader className="ion-no-border">
        <IonToolbar className="blue-toolbar">
          <IonSearchbar
            placeholder="搜索社团"
            style={{ "--background": "white" }}
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
              background: "var(--ion-color-blue)",
              position: "relative",
              height: "23vh",
              paddingTop: "2vh",
            }}
          >
            <svg
              viewBox="0 0 100 75"
              width="100%"
              height="15vh"
              preserveAspectRatio="none"
              style={{
                position: "absolute",
                // marginBottom: "-1px",
                bottom: 0,
                display: "block",
              }}
            >
              <path d="M 0 75 S 50 0, 100 75" fill="white" stroke="none" />
            </svg>
            {adList}
          </div>
        </div>

        {orgList}
      </IonContent>
    </IonPage>
  );
};
