import * as React from "react";
import { IonButton, IonCol, IonRow } from "@ionic/react";

interface BtnProps {
  title: string;
  fill: "outline" | "solid" | "clear";
  onClick: () => void;
  disabled?: boolean;
}

export default ({ left, right }: { left: BtnProps; right: BtnProps }) => {
  return (
    <>
      <div style={{ height: "10vh" }} />
      <div
        style={{
          position: "fixed",
          width: "100%",
          bottom: 0,
          background: "white",
          padding: "0 3vw 20px",
        }}
      >
        <IonRow>
          <IonCol>
            <IonButton
              onClick={left.onClick}
              color="primary"
              fill={left.fill}
              expand={"block"}
              disabled={left.disabled}
            >
              {left.title}
            </IonButton>
          </IonCol>
          <IonCol>
            <IonButton
              onClick={right.onClick}
              color="primary"
              fill={right.fill}
              expand={"block"}
              disabled={right.disabled}
            >
              {right.title}
            </IonButton>
          </IonCol>
        </IonRow>
      </div>
    </>
  );
};
