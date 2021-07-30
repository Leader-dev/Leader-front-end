import {
  IonBackButton,
  IonButtons,
  IonContent,
  IonIcon,
  IonPage,
  IonTitle,
  IonToolbar,
} from "@ionic/react";
import { construct } from "ionicons/icons";
import { useLocation } from "react-router";

export const WIPIndicator = () => {
  const location = useLocation();
  return (
    <IonPage>
      <IonToolbar>
        {location.pathname.startsWith("/tabs") ? null : (
          <IonButtons slot="start">
            <IonBackButton defaultHref="/" />
          </IonButtons>
        )}
        <IonTitle>糟糕</IonTitle>
      </IonToolbar>
      <IonContent fullscreen>
        <div
          style={{
            display: "flex",
            height: "100%",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <div style={{ padding: "0 5vw", textAlign: "center" }}>
            <IonIcon icon={construct} style={{ fontSize: "128px" }} />
            <div style={{ fontSize: "26px", textAlign: "center" }}>WIP</div>
            <div style={{ fontSize: "15px", textAlign: "center" }}>
              这是一个装修页面。我们正在决定他的功能。请过段时间再尝试。
            </div>
          </div>
        </div>
      </IonContent>
    </IonPage>
  );
};
