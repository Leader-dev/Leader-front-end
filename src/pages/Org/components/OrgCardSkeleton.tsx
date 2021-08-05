import * as React from "react";
import {
  IonCard,
  IonCol,
  IonGrid,
  IonRow,
  IonSkeletonText,
} from "@ionic/react";

export default () => {
  return (
    <IonCard style={{ margin: "10px 0" }}>
      <IonGrid style={{ padding: "12px" }}>
        <IonRow>
          <IonCol size="5">
            <IonSkeletonText
              animated
              style={{
                borderRadius: "8px",
                width: "100%",
                height: "100%",
                objectFit: "cover",
                overflow: "hidden",
              }}
            />
          </IonCol>
          <IonCol
            className="ion-align-self-center"
            size="6"
            style={{ fontSize: "80%", lineHeight: "140%", color: "black" }}
          >
            <div
              style={{
                fontSize: "120%",
                fontWeight: "bold",
                lineHeight: "150%",
              }}
            >
              <IonSkeletonText animated style={{ width: "50%" }} />
            </div>
            <div
              style={{
                fontSize: "100%",
                color: "var(--ion-color-medium)",
                lineHeight: "140%",
              }}
            >
              <IonSkeletonText animated style={{ width: "30%" }} />
            </div>
            <div
              style={{
                display: "flex",
                alignItems: "center",
              }}
            >
              <IonSkeletonText animated style={{ width: "40%" }} />
            </div>
            <div>
              <IonSkeletonText animated style={{ width: "35%" }} />
            </div>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                color: "var(--ion-color-primary)",
              }}
            >
              <IonSkeletonText animated style={{ width: "20%" }} />
            </div>
          </IonCol>
        </IonRow>
      </IonGrid>
    </IonCard>
  );
};
