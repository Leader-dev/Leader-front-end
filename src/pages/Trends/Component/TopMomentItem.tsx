import { IonIcon, IonItem, IonLabel, IonText } from "@ionic/react";
import { arrowUp } from "ionicons/icons";
import User from "./User";
import React from "react";
import { MomentInfo } from "./MomentCard";

export interface TopMomentInfo extends MomentInfo {
  upRank: number;
}

export default ({ info }: { info: TopMomentInfo }) => {
  return (
    <IonItem>
      <div style={{ marginLeft: -4, marginRight: 12 }} slot="start">
        <IonLabel>
          <IonText color="primary">
            <p>
              <IonIcon slot="end" icon={arrowUp} />#{info.upRank}
            </p>
          </IonText>
        </IonLabel>
      </div>
      <User info={info} />
      <IonLabel>
        <p>{info.content}</p>
      </IonLabel>
      <div slot="end">
        <IonLabel>
          <IonText color="primary">
            <p>
              <IonIcon slot="end" icon={arrowUp} />
              {info.upCount}
            </p>
          </IonText>
        </IonLabel>
      </div>
    </IonItem>
  );
};
