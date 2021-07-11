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
import Trends from "../Trends";
import Organization from "../Organization";

const OrgDetail: React.FC = () => {
  return (
    <IonPage>
      <IonHeader className="image-header">
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
              <Route exact path="/tabs/trends" component={Trends} />
              <Route exact path="/tabs/organization" component={Organization} />
            </IonRouterOutlet>
            <IonTabBar slot="top">
              <IonTabButton tab="trends" href="/tabs/trends">
                <IonIcon icon={triangle} />
                <IonLabel> 动态 </IonLabel>
              </IonTabButton>
              <IonTabButton tab="orgs" href="/tabs/organization">
                <IonIcon icon={ellipse} />
                <IonLabel> 展示 </IonLabel>
              </IonTabButton>
            </IonTabBar>
          </IonTabs>
        </IonToolbar>
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
