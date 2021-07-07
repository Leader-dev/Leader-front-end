import * as React from "react";
import { IonCard, IonSkeletonText } from "@ionic/react";

export default () => {
  return (
    <IonCard
      style={{
        height: "100%",
        width: "100%",
        margin: 0,
      }}
    >
      <IonSkeletonText />
    </IonCard>
  );
};
