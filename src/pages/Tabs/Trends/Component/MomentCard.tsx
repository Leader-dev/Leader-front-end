import {
  IonCard,
  IonCardContent,
  IonIcon,
  IonImg,
  IonItem,
  IonLabel,
  IonText,
  useIonActionSheet,
} from "@ionic/react";
import React from "react";
import User, { UserInfo } from "./User";
import {
  arrowUp,
  ellipse,
  ellipseOutline,
  ellipsisHorizontal,
} from "ionicons/icons";
import { useStartUrl } from "@/services/service/image/accessStartUrl";

export interface MomentInfo extends UserInfo {
  content: string;
  upCount: number;
  imageUrls: string[];
}

const MomentCard = ({ info }: { info: MomentInfo }) => {
  const { content, upCount, imageUrls } = info;
  const [present, dismiss] = useIonActionSheet();
  const { data: startUrl } = useStartUrl();
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
      <IonCardContent>
        <div>{content}</div>
        {!!imageUrls.length && (
          <div style={{ height: "128px" }}>
            {imageUrls.slice(0, 3).map((url) => (
              <IonImg src={startUrl + url} />
            ))}
          </div>
        )}
      </IonCardContent>
      <IonItem>
        <IonLabel>
          <p>2021年</p>
        </IonLabel>
        <div slot="end">
          <IonLabel>
            <IonText color="primary" onClick={() => {}}>
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
export default MomentCard;
