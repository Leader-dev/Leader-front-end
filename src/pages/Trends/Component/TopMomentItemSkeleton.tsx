import {IonIcon, IonItem, IonLabel, IonSkeletonText, IonText} from "@ionic/react";
import {arrowUp} from "ionicons/icons";
import User from "./User";
import React from "react";
import UserSkeleton from "./UserSkeleton";

export default ({ rank }: { rank: number }) => {
  return (
    <IonItem>
      <div style={{ marginLeft: -4, marginRight: 12 }} slot="start">
        <IonLabel>
          <IonText color="primary">
            <p>
              <IonIcon slot="end" icon={arrowUp} />
              #{ rank }
            </p>
          </IonText>
        </IonLabel>
      </div>
      <UserSkeleton/>
      <IonLabel>
        <p>
          <IonSkeletonText animated style={{ width: "60px" }} />
        </p>
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
  )
}
