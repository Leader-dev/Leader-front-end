import {
  IonCard,
  IonCardContent,
  IonIcon,
  IonItem,
  IonLabel,
  IonText,
  useIonActionSheet,
} from "@ionic/react";
import React, { useState } from "react";
import User, { UserInfo } from "./User";
import {
  arrowUp,
  ellipse,
  ellipseOutline,
  ellipsisHorizontal,
} from "ionicons/icons";

export interface MomentInfo extends UserInfo {
  content: string;
  upCount: number;
}

export default ({ info }: { info: MomentInfo }) => {
  const { content, upCount } = info;
  const [present, dismiss] = useIonActionSheet();
  return (
    <IonCard>
      <IonItem style={{ marginTop: 8 }} onClick={() => {}} lines="none">
        <User info={info} />
        <div slot="end">
          <IonLabel>
            <IonIcon
              icon={ellipsisHorizontal}
              onClick={() => {
                present({
                  buttons: [
                    {
                      text: "举报",
                      role: "destructive",
                    },
                    {
                      text: "取消",
                      role: "cancel",
                    },
                  ],
                  header: "对动态的操作",
                });
              }}
            />
          </IonLabel>
        </div>
      </IonItem>
      <IonCardContent>{content}</IonCardContent>
      <IonItem>
        <IonLabel>
          <p>2021年</p>
        </IonLabel>
        <div slot="end">
          <IonLabel>
            <IonText color="primary">
              <p>
                确实
                <IonIcon slot="end" icon={arrowUp} />
                {upCount}
              </p>
            </IonText>
          </IonLabel>
        </div>
      </IonItem>
    </IonCard>
  );
};
