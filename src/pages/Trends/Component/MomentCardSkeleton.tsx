import {
  IonCard,
  IonCardContent,
  IonIcon,
  IonItem,
  IonLabel,
  IonSkeletonText,
  IonText,
} from "@ionic/react";
import User from "./User";
import { arrowUp, ellipsisHorizontal } from "ionicons/icons";
import React from "react";
import UserSkeleton from "./UserSkeleton";

export default () => {
  return (
    <IonCard>
      <IonItem style={{ marginTop: 8 }} onClick={() => {}} lines="none">
        <UserSkeleton />
      </IonItem>
      <IonCardContent>
        <IonSkeletonText animated style={{ width: "100%" }} />
        <IonSkeletonText animated style={{ width: "100%" }} />
        <IonSkeletonText animated style={{ width: "80%" }} />
      </IonCardContent>
      <IonItem>
        <IonLabel>
          <IonSkeletonText animated style={{ width: "100px" }} />
        </IonLabel>
        <div slot="end">
          <IonLabel>
            <IonText color="primary">
              <p>
                <IonSkeletonText animated style={{ width: "60px" }} />
              </p>
            </IonText>
          </IonLabel>
        </div>
      </IonItem>
    </IonCard>
  );
};
