import * as React from "react";
import {
  IonCol,
  IonGrid,
  IonButton,
  IonRow,
  IonIcon,
  IonSkeletonText,
} from "@ionic/react";

export default () => {
  return (
    <IonGrid>
      <IonRow>
        <IonCol size="10">
          <IonSkeletonText animated style={{ width: "50%" }} />
          <IonSkeletonText animated style={{ width: "30%" }} />
          <IonSkeletonText animated style={{ width: "40%" }} />
          <IonSkeletonText animated style={{ width: "40%" }} />
        </IonCol>
        <IonCol size="2" className="ion-align-self-center">
          <IonSkeletonText animated />
        </IonCol>
      </IonRow>
      <IonSkeletonText animated style={{ width: "20%", marginTop: "10px" }} />
      <IonSkeletonText animated />
      <IonSkeletonText animated />
      <IonSkeletonText animated />
      <IonSkeletonText animated />
      <IonSkeletonText animated />
      <IonSkeletonText animated />
    </IonGrid>
  );
};
