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

import Trends from "@/pages/Tabs/Trends";
import OrgDisplay from "@/pages/Tabs/OrgDisplay";
import Management from "@/pages/Tabs/Management";
import Coop from "@/pages/Tabs/Cooperation";
import Personal from "@/pages/Tabs/Personal";
import SignUp from "@/pages/SignUp";
import MemberManagement from "@/pages/Org/ManageMember";
import OrgDetail from "@/pages/Org/Detail";
import OrgHome from "@/pages/Org/Home";
import OrgApply from "@/pages/Org/Apply";

const TabsRoute: React.FC = () => {
  return (
    <IonTabs>
      <IonRouterOutlet>
        <Route exact path="/tabs/trends" component={Trends} />
        <Route exact path="/tabs/org-display" component={OrgDisplay} />
        <Route exact path="/tabs/management" component={Management} />
        <Route exact path="/tabs/coop" component={Coop} />
        <Route exact path="/tabs/person" component={Personal} />
      </IonRouterOutlet>
      <IonTabBar slot="bottom">
        <IonTabButton tab="trends" href="/tabs/trends">
          <IonIcon icon={triangle} />
          <IonLabel> 动态 </IonLabel>
        </IonTabButton>
        <IonTabButton tab="orgs" href="/tabs/org-display">
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
        <Route path="/tabs" component={TabsRoute} />
        <Route path="/signup" component={SignUp} />
        <Route path="/org/:ordId/detail" component={OrgDetail} />
        <Route path="/org/:ordId/apply" component={OrgApply} />
        <Route path="/org/:orgId/members" component={MemberManagement} />
        <Route path="/org/:orgId/home" component={OrgHome} />
        <Route exact path="/">
          <Redirect to="/tabs/trends" />
        </Route>
      </IonRouterOutlet>
    </IonReactRouter>
  );
};
