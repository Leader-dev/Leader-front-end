import {
  IonBackButton,
  IonButtons,
  IonContent,
  IonPage,
  IonTitle,
  IonToolbar,
} from "@ionic/react";

export const WIPIndicator = () => {
  return (
    <IonPage>
      <IonToolbar>
        <IonButtons slot="start">
          <IonBackButton defaultHref="/" />
        </IonButtons>
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
          <div style={{ padding: "0 5vw" }}>
            <div style={{ fontSize: "64px", textAlign: "center" }}>WIP</div>
            <div style={{ fontSize: "15px", textAlign: "center" }}>
              这是一个装修页面。我们正在决定他的功能。请过段时间再尝试。
            </div>
          </div>
        </div>
      </IonContent>
    </IonPage>
  );
};
