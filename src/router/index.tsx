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

import NoTabPage from "@/pages/NoTabPage";

import Trends from "@/pages/Tabs/Trends";
import OrgDisplay from "@/pages/Tabs/OrgDisplay";
import Management from "@/pages/Tabs/Management";
import Coop from "@/pages/Tabs/Cooperation";
import Personal from "@/pages/Tabs/Personal";
import Member from "@/pages/Org/Member";
import OrgDetail from "@/pages/Org/Detail";
import OrgHome from "@/pages/Org/Home";
import OrgApply from "@/pages/Org/Apply";
import OrgCreate from "@/pages/Org/Create";
import RecruitManage from "@/pages/Org/Recruit";
import PublicInfoManage from "@/pages/Org/PublicInfo";
import WIPIndicator from "@/pages/Tabs/Cooperation";
import NewTrend from "@/pages/Trends/New";
import PersonalFavorite from "@/pages/Personal/Favorite";
import OrgSearch from "@/pages/Org/Search";
import ManageMemberPage from "@/pages/Org/ManageMember";
import AccountRouter from "@/pages/Personal/Account";
import ApplicationDetail from "@/pages/Org/ApplicationDetail";
import TimelinePage from "@/pages/Org/Timeline";

const TabsRoute: React.FC = () => {
  return (
    <IonTabs>
      <IonRouterOutlet>
        <Route exact path="/tabs/trends" component={Trends} />
        <Redirect exact from={"/tabs"} to={"/tabs/trends"} />
        <Route exact path="/tabs/org-display" component={OrgDisplay} />
        <Route exact path="/tabs/management" component={Management} />
        <Route exact path="/tabs/coop" component={Coop} />
        <Route exact path="/tabs/person" component={Personal} />
      </IonRouterOutlet>
      <IonTabBar slot="bottom">
        <IonTabButton tab="trends" href="/tabs/trends">
          <IonIcon src={"/assets/icon/trends.svg"} />
          <IonLabel> 动态 </IonLabel>
        </IonTabButton>
        <IonTabButton tab="orgs" href="/tabs/org-display">
          <IonIcon src={"/assets/icon/display.svg"} />
          <IonLabel> 展示 </IonLabel>
        </IonTabButton>
        <IonTabButton tab="management" href="/tabs/management">
          <IonIcon src={"/assets/icon/management.svg"} />
          <IonLabel> 管理 </IonLabel>
        </IonTabButton>
        <IonTabButton tab="coop" href="/tabs/coop">
          <IonIcon src={"/assets/icon/cooperation.svg"} />
          <IonLabel> 项目 </IonLabel>
        </IonTabButton>
        <IonTabButton tab="person" href="/tabs/person">
          <IonIcon src={"/assets/icon/person.svg"} />
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
        <Redirect exact from={"/"} to={"/tabs"} />
        <Route path="/trends/new" component={NewTrend} />
        <Route path="/org/create" component={OrgCreate} />
        <Route path="/org/search" component={OrgSearch} />
        <Route
          path="/org/application/:applicationId"
          component={ApplicationDetail}
        />
        <Route path="/org/:orgId/detail" component={OrgDetail} />
        <Route path="/org/:orgId/timeline" component={TimelinePage} />
        <Route path="/org/:orgId/apply" component={OrgApply} />
        <Route path="/org/:orgId/members" component={Member} />
        <Route path="/org/:orgId/manage-members" component={ManageMemberPage} />
        <Route path="/org/:orgId/recruit" component={RecruitManage} />
        <Route path="/org/:orgId/public-info" component={PublicInfoManage} />
        <Route path="/org/:orgId/home" component={OrgHome} />
        <Route path="/person/favorite" component={PersonalFavorite} />
        <Route path="/person/account" component={AccountRouter} />
        <Route component={WIPIndicator} />
      </IonRouterOutlet>
    </IonReactRouter>
  );
};
