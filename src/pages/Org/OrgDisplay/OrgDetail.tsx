import * as React from "react";
import {
  IonButtons,
  IonBackButton,
  IonLabel,
  IonPage,
  IonSegment,
  IonSegmentButton,
  IonToolbar,
  IonHeader,
  IonContent,
  IonTitle,
  IonButton,
  IonIcon,
  IonTabs,
  IonBadge,
  IonTabBar,
  IonTabButton,
  IonRouterOutlet,
} from "@ionic/react";
import "./OrgDetail.css";
import {
  calendar,
  ellipse,
  heartOutline,
  informationCircle,
  map,
  personCircle,
  square,
  triangle,
  warningOutline,
} from "ionicons/icons";
import { Route } from "react-router-dom";
import Trends from "@/pages/Tabs/Trends";
import Organization from "@/pages/Tabs/OrgDisplay";

const OrgDetail: React.FC = () => {
  return (
    <IonPage>
      <IonHeader className="image-header">
        <div
          style={{
            height: "100%",
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
          }}
        >
          <IonToolbar className="transparent-toolbar">
            <IonButtons slot="start">
              <IonBackButton defaultHref="/" color="light" text="" />
            </IonButtons>
            <IonButtons slot="end">
              <IonButton color="light">
                <IonIcon slot="icon-only" icon={heartOutline} />
              </IonButton>
              <IonButton color="light">
                <IonIcon slot="icon-only" icon={warningOutline} />
              </IonButton>
            </IonButtons>
          </IonToolbar>

          <IonToolbar className="transparent-toolbar">
            <IonTabs>
              <IonRouterOutlet>
                <Route path="/tabs/trends" component={Trends} />
                <Route path="/tabs/organization" component={Organization} />
              </IonRouterOutlet>
              <IonTabBar slot="top" className="customized-tab-bar">
                <IonTabButton tab="trends" href="/tabs/trends">
                  <IonLabel> 详细信息 </IonLabel>
                </IonTabButton>
                <IonTabButton tab="orgs" href="/tabs/organization">
                  <IonLabel> 对外联络 </IonLabel>
                </IonTabButton>
              </IonTabBar>
            </IonTabs>
          </IonToolbar>
        </div>
      </IonHeader>

      <IonContent fullscreen>
        <div
          style={{
            borderRadius: "10px",
          }}
        ></div>
      </IonContent>
    </IonPage>
  );
};

export default OrgDetail;
