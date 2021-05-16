import {
  IonAvatar,
  IonIcon,
  IonLabel,
  IonSkeletonText,
  IonText,
} from "@ionic/react";
import { checkmarkOutline } from "ionicons/icons";
import React from "react";

export default () => {
  return (
    <React.Fragment>
      <IonAvatar style={{ marginRight: 12 }} slot="start">
        <IonSkeletonText animated />
      </IonAvatar>
      <IonLabel>
        <h3>
          <IonSkeletonText animated style={{ width: "70px" }} />
        </h3>
        <p>
          <IonSkeletonText animated style={{ width: "50px" }} />
        </p>
      </IonLabel>
    </React.Fragment>
  );
};
