import { IonButton } from "@ionic/react";
import * as React from "react";

export default ({
  title,
  submit,
  onClick,
}: {
  title: string;
  submit: boolean;
  onClick?: () => void;
}) => {
  return (
    <>
      <div style={{ height: "10vh" }} />
      <div
        style={{
          position: "fixed",
          width: "100%",
          bottom: 0,
          display: "flex",
          background: "white",
        }}
      >
        {submit ? (
          <IonButton
            style={{ margin: "15px 5vw", width: "100%" }}
            expand={"block"}
            type={"submit"}
          >
            {title}
          </IonButton>
        ) : (
          <IonButton
            style={{ margin: "15px 5vw", width: "100%" }}
            expand={"block"}
            onClick={onClick}
          >
            {title}
          </IonButton>
        )}
      </div>
    </>
  );
};
