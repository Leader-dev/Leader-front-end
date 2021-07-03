import { IonApp } from "@ionic/react";

/* Core CSS required for Ionic components to work properly */
import "@ionic/react/css/core.css";

/* Basic CSS for apps built with Ionic */
import "@ionic/react/css/normalize.css";
import "@ionic/react/css/structure.css";
import "@ionic/react/css/typography.css";

/* Optional CSS utils that can be commented out */
import "@ionic/react/css/padding.css";
import "@ionic/react/css/float-elements.css";
import "@ionic/react/css/text-alignment.css";
import "@ionic/react/css/text-transformation.css";
import "@ionic/react/css/flex-utils.css";
import "@ionic/react/css/display.css";

/* Theme variables */
import "./theme/variables.css";

import { SWRConfig } from "swr";
import axios from "@/utils/request";
import { AppRouter } from "./router";

const swrConfig = {
  // @ts-ignore
  fetcher: (...params: any[]) => axios(...params).then((res) => res.data),
  revalidateOnFocus: false,
  revalidateOnReconnect: false,
  shouldRetryOnError: false,
};
const App: React.FC = () => (
  <SWRConfig value={swrConfig}>
    <IonApp>
      <AppRouter />
    </IonApp>
  </SWRConfig>
);

export default App;
