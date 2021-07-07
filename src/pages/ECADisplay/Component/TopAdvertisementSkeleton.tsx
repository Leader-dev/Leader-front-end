import * as React from "react";
import { IonSlide, IonSlides, IonSkeletonText } from "@ionic/react";

export default () => {
  return (
    <IonSlide
      style={{
        borderRadius: "10px",
        overflow: "hidden",
      }}
    >
      <IonSkeletonText animated style={{ width: "100%" }} />
    </IonSlide>
  );
};
