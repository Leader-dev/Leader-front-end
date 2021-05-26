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

// TODO: Add ts definitions to import alias
// @ts-ignore
import NoTabPage from "@/pages/NoTabPage";

// @ts-ignore
import Trends from "@/pages/Trends";
// @ts-ignore
import ECADisplay from "@/pages/ECADisplay";
// @ts-ignore
import Management from "@/pages/Management";
// @ts-ignore
import Coop from "@/pages/Cooperation";
// @ts-ignore
import Personal from "@/pages/Personal";

const TabsRoute: React.FC = () => {
  return (
    <IonTabs>
      <IonRouterOutlet>
        <Route exact path="/tabs/trends" component={Trends} />
        <Route exact path="/tabs/eca-display" component={ECADisplay} />
        <Route exact path="/tabs/eca-management" component={Management} />
        <Route exact path="/tabs/coop" component={Coop} />
        <Route exact path="/tabs/person" component={Personal} />
      </IonRouterOutlet>
      <IonTabBar slot="bottom">
        <IonTabButton tab="trends" href="/tabs/trends">
          <IonIcon icon={triangle} />
          <IonLabel> 动态 </IonLabel>
        </IonTabButton>
        <IonTabButton tab="eca-display" href="/tabs/eca-display">
          <IonIcon icon={ellipse} />
          <IonLabel> 展示 </IonLabel>
        </IonTabButton>
        <IonTabButton tab="eca-management" href="/tabs/eca-management">
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
        <Route exact path="/">
          <Redirect to="/tabs/trends" />
        </Route>
      </IonRouterOutlet>
    </IonReactRouter>
  );
};
