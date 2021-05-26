import {
  IonContent,
  IonHeader,
  IonPage,
  IonTitle,
  IonToolbar,
} from "@ionic/react";
import "./index.css";

import { TestText } from "@/components/test";

const Management: React.FC = () => {
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>管理</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <TestText />
      </IonContent>
    </IonPage>
  );
};

export default Management;
