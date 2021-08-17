import { IonButton, IonInput } from "@ionic/react";
import * as React from "react";

export default ({
  content,
  submit = false,
  onClick,
  routerLink,
  color,
}: {
  content: string | React.ReactNode;
  submit?: boolean;
  onClick?: () => void;
  routerLink?: string;
  color?: string;
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
          <IonButton
            style={{ margin: "0 5vw", width: "90vw" }}
            type={"submit"}
            color={color}
          >
            {content}
          </IonButton>
        ) : (
          <IonButton
            style={{ margin: "0 5vw", width: "90vw" }}
            onClick={onClick}
            routerLink={routerLink}
            color={color}
          >
            {content}
          </IonButton>
        )}
      </div>
    </>
  );
};
