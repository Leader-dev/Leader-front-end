import { useQueryOrgs } from "@/services/org/list";
import { IonPage, IonContent } from "@ionic/react";
import * as React from "react";

const NoTabPage: React.FC = () => {
  const k = useQueryOrgs({ pageSize: 5 });
  console.log(k);
  return (
    <IonPage>
      <IonContent fullscreen>I am a page with no tabs!</IonContent>
    </IonPage>
  );
};

export default NoTabPage;
