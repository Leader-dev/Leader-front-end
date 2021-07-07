import * as React from "react";
import { IonSlide, IonSlides, IonSkeletonText } from "@ionic/react";

export default () => {
  return (
    <IonSlides
      className="top-slider"
      pager={true}
      style={{
        height: "23vh",
        width: "92vw",
      }}
    >
      <IonSlide
        style={{
          borderRadius: "10px",
        }}
      >
        <IonSkeletonText animated style={{ width: "100%", height: "100%" }} />
      </IonSlide>
    </IonSlides>
  );
};
