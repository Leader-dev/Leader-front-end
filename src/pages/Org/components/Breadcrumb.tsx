import * as React from "react";
import { IonItem, IonText } from "@ionic/react";

export default ({
  path,
}: {
  path: { name: string; onClick?: () => void }[];
}) => {
  return (
    <IonItem>
      {path.map(({ name, onClick }, i) => {
        if (i !== path.length - 1) {
          return (
            <>
              <IonText color={"primary"} onClick={onClick}>
                {name}
              </IonText>
              <span style={{ marginLeft: "3px", marginRight: "3px" }}>
                {" > "}
              </span>
            </>
          );
        } else {
          return <span onClick={onClick}>{name}</span>;
        }
      })}
    </IonItem>
  );
};
