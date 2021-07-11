import * as React from "react";
import { IonReactRouter } from "@ionic/react-router";
import {
  IonIcon,
  IonLabel,
  IonRouterOutlet,
  IonTabBar,
  IonTabButton,
  IonTabs,
} from "@ionic/react";
import { Redirect, Route } from "react-router-dom";
import { ellipse, square, triangle } from "ionicons/icons";

import NoTabPage from "@/pages/NoTabPage";
import OrgDetail from "@/pages/NoTabPage/OrgDetail";

import Trends from "@/pages/Trends";
import Organization from "@/pages/Organization";
import Management from "@/pages/Management";
import Coop from "@/pages/Cooperation";
import Personal from "@/pages/Personal";
import SignUp from "@/pages/SignUp";
import MemberManagement from "@/pages/Org/ManageMember";

const TabsRoute: React.FC = () => {
  return (
    <IonTabs>
      <IonRouterOutlet>
        <Route exact path="/tabs/trends" component={Trends} />
        <Route exact path="/tabs/organization" component={Organization} />
        <Route exact path="/tabs/management" component={Management} />
        <Route exact path="/tabs/coop" component={Coop} />
        <Route exact path="/tabs/person" component={Personal} />
      </IonRouterOutlet>
      <IonTabBar slot="bottom">
        <IonTabButton tab="trends" href="/tabs/trends">
          <IonIcon icon={triangle} />
          <IonLabel> 动态 </IonLabel>
        </IonTabButton>
        <IonTabButton tab="orgs" href="/tabs/organization">
          <IonIcon icon={ellipse} />
          <IonLabel> 展示 </IonLabel>
        </IonTabButton>
        <IonTabButton tab="management" href="/tabs/management">
          <IonIcon icon={ellipse} />
          <IonLabel> 管理 </IonLabel>
        </IonTabButton>
        <IonTabButton tab="coop" href="/tabs/coop">
          <IonIcon icon={square} />
          <IonLabel> 合作 </IonLabel>
        </IonTabButton>
        <IonTabButton tab="person" href="/tabs/person">
          <IonIcon icon={square} />
          <IonLabel> 个人 </IonLabel>
        </IonTabButton>
      </IonTabBar>
    </IonTabs>
  );
};

export const AppRouter: React.FC = () => {
  return (
    <IonReactRouter>
      <IonRouterOutlet>
        <Route exact path="/notab" component={NoTabPage} />
        <Route exact path="/notab/org-detail" component={OrgDetail} />
        <Route path="/tabs" component={TabsRoute} />
        <Route path="/signup" component={SignUp} />
        <Route path="/org/:orgId/members" component={MemberManagement} />
        <Route exact path="/">
          <Redirect to="/tabs/trends" />
        </Route>
      </IonRouterOutlet>
    </IonReactRouter>
  );
};
