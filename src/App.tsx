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
import { useAuthed } from "./services/user/info/get";
import { useEffect } from "react";

const swrConfig = {
  // @ts-ignore
  fetcher: (...params: any[]) => axios(...params).then((res) => res.data),
  revalidateOnFocus: false,
  revalidateOnReconnect: false,
  shouldRetryOnError: false,
};

const Protection: React.FC = ({ children }) => {
  const { isLoading, isAuthed } = useAuthed();

  useEffect(() => {
    if (typeof isAuthed === "boolean" && !isAuthed) {
      // prompt for login modal
    }
  }, [isAuthed]);
  if (isLoading) {
    return <>Loading</>;
  }
  if (isAuthed) {
    return <>{children}</>;
  } else {
    return <>Waiting for log in </>;
  }
};

const App: React.FC = () => (
  <SWRConfig value={swrConfig}>
    <Protection>
      <IonApp>
        <AppRouter />
      </IonApp>
    </Protection>
  </SWRConfig>
);
export default App;
