import * as React from "react";
import { IonCard, IonCardContent, IonSkeletonText } from "@ionic/react";

export default ({ size }: { size: string }) => {
  let posterProportion;
  if (size === "large") {
    posterProportion = 86;
  } else {
    posterProportion = 70;
  }
  return (
    <IonCard
      style={{
        height: "100%",
        width: "100%",
        margin: 0,
      }}
    >
      <div
        style={{
          height: posterProportion + "%",
        }}
      >
        <IonSkeletonText animated style={{ width: "100%", height: "100%" }} />
      </div>

      <IonCardContent
        style={{
          height: 1 - posterProportion + "%",
          padding: "5px 2vw",
        }}
      >
        <IonSkeletonText animated style={{ width: "40%" }} />
        <IonSkeletonText animated style={{ width: "30%" }} />
      </IonCardContent>
    </IonCard>
  );
};
