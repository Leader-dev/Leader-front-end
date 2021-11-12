import { IonButton, IonInput } from "@ionic/react";
import * as React from "react";

export default ({
  content,
  submit = false,
  onClick,
  routerLink,
  disabled = false,
  color,
}: {
  content: string | React.ReactNode;
  submit?: boolean;
  onClick?: () => void;
  routerLink?: string;
  color?: string;
  disabled?: boolean;
}) => {
  return (
    <>
      <div style={{ height: "10vh" }} />
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
            disabled={disabled}
          >
            {content}
          </IonButton>
        ) : (
          <IonButton
            style={{ margin: "0 5vw", width: "90vw" }}
            onClick={onClick}
            routerLink={routerLink}
            disabled={disabled}
            color={color}
          >
            {content}
          </IonButton>
        )}
      </div>
    </>
  );
};
