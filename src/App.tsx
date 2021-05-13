import { Redirect, Route } from 'react-router-dom';
import {
  IonApp,
  IonIcon,
  IonLabel,
  IonRouterOutlet,
  IonTabBar,
  IonTabButton,
  IonTabs,
} from '@ionic/react';
import { IonReactRouter } from '@ionic/react-router';
import { ellipse, square, triangle } from 'ionicons/icons';
import Trends from './pages/Trends';
import ECADisplay from './pages/ECA-Display';
import Management from "./pages/Management";
import Coop from './pages/Cooperation';
import Personal from "./pages/Personal";

/* Core CSS required for Ionic components to work properly */
import '@ionic/react/css/core.css';

/* Basic CSS for apps built with Ionic */
import '@ionic/react/css/normalize.css';
import '@ionic/react/css/structure.css';
import '@ionic/react/css/typography.css';

/* Optional CSS utils that can be commented out */
import '@ionic/react/css/padding.css';
import '@ionic/react/css/float-elements.css';
import '@ionic/react/css/text-alignment.css';
import '@ionic/react/css/text-transformation.css';
import '@ionic/react/css/flex-utils.css';
import '@ionic/react/css/display.css';

/* Theme variables */
import './theme/variables.css';

const App: React.FC = () => (
  <IonApp>
    <IonReactRouter>
      <IonTabs>
        <IonRouterOutlet>
          <Route exact path="/trends">
            <Trends />
          </Route>
          <Route exact path="/eca-display">
            <ECADisplay />
          </Route>
          <Route exact path="/eca-management">
            <Management />
          </Route>
          <Route exact path="/coop">
            <Coop />
          </Route>
          <Route exact path="/person">
            <Personal />
          </Route>
          <Route exact path="/">
            <Redirect to="/trends" />
          </Route>
        </IonRouterOutlet>

        <IonTabBar slot="bottom">
          <IonTabButton tab="trends" href="/trends">
            <IonIcon icon={triangle} />
            <IonLabel> 动态 </IonLabel>
          </IonTabButton>
          <IonTabButton tab="eca-display" href="/eca-display">
            <IonIcon icon={ellipse} />
            <IonLabel> 展示 </IonLabel>
          </IonTabButton>
          <IonTabButton tab="eca-management" href="/eca-management">
            <IonIcon icon={ellipse} />
            <IonLabel> 管理 </IonLabel>
          </IonTabButton>
          <IonTabButton tab="coop" href="/coop">
            <IonIcon icon={square} />
            <IonLabel> 合作 </IonLabel>
          </IonTabButton>
          <IonTabButton tab="person" href="/person">
            <IonIcon icon={square} />
            <IonLabel> 个人 </IonLabel>
          </IonTabButton>
        </IonTabBar>
      </IonTabs>
    </IonReactRouter>
  </IonApp>
);

export default App;
