import { IonButton } from "@ionic/react";
import * as React from "react";

export default ({
  content,
  submit = false,
  onClick,
  routerLink,
}: {
  content: string | React.ReactNode;
  submit?: boolean;
  onClick?: () => void;
  routerLink?: string;
}) => {
  return (
    <>
      <div style={{ height: "5vh" }} />
      <div
        style={{
          position: "fixed",
          width: "100%",
          bottom: 0,
          paddingBottom: "20px",
          background: "white",
        }}
      >
        {submit ? (
          <IonButton style={{ margin: "0 5vw", width: "90vw" }} type={"submit"}>
            {content}
          </IonButton>
        ) : (
          <IonButton
            style={{ margin: "0 5vw", width: "90vw" }}
            onClick={onClick}
            routerLink={routerLink}
          >
            {content}
          </IonButton>
        )}
      </div>
    </>
  );
};
