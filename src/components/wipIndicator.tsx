import {
  IonBackButton,
  IonButtons,
  IonContent,
  IonIcon,
  IonImg,
  IonPage,
  IonTitle,
  IonToolbar,
} from "@ionic/react";
import * as React from "react";
import { useLocation } from "react-router";
import ToolbarWithBackButton from "./ToolbarWithBackButton";

export const WIPIndicator = () => {
  const location = useLocation();
  return (
    <IonPage>
      {location.pathname.startsWith("/tabs") ? null : <ToolbarWithBackButton />}
      <IonContent fullscreen>
        <div style={{ padding: "30vh 25vw" }}>
          <IonImg src={"/assets/icon/no-profile.svg"} />
          <div
            style={{
              marginTop: "30px",
              textAlign: "center",
              color: "var(--ion-color-medium)",
            }}
          >
            暂无档案
          </div>
        </div>
      </IonContent>
    </IonPage>
  );
};
