/** @jsxImportSource @emotion/react */
import { css, jsx } from "@emotion/react";
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
  images,
} from "ionicons/icons";
import { useStartUrl } from "@/services/service/image/accessStartUrl";
import { Square } from "@/components/square";

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
          <div
            style={{
              height: "96px",
              display: "flex",
              marginTop: "8px",
              position: "relative",
              overflow: "hidden",
            }}
          >
            {imageUrls.slice(0, 3).map((url) => (
              <Square
                style={{ width: "96px", flex: "0 0 auto", marginRight: "2px" }}
              >
                <IonImg
                  css={css`
                    height: 100%;
                    width: 100%;
                    text-align: center;
                    overflow-x: hidden;
                    border-radius: 4px;

                    &::part(image) {
                      object-fit: cover;
                    }
                  `}
                  src={startUrl + url}
                />
              </Square>
            ))}
            {imageUrls.length >= 1 ? (
              <div
                css={css`
                  position: absolute;
                  top: 0;
                  right: 0;
                  height: 100%;
                  color: var(--ion-color-primary);
                  background: rgb(255, 255, 255);
                  background: linear-gradient(
                    90deg,
                    rgba(255, 255, 255, 0) 0%,
                    rgba(255, 255, 255, 0.9) 22%,
                    rgba(255, 255, 255, 1) 30%
                  );
                  display: flex;
                  padding-left: 24px;
                  padding-right: 8px;
                  flex-direction: column;
                  justify-content: center;
                  & > * {
                    margin: 0 auto;
                  }
                `}
              >
                更多...
              </div>
            ) : null}
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
