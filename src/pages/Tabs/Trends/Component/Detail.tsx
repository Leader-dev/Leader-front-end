/** @jsxImportSource @emotion/react */
import { css, jsx } from "@emotion/react";
import { Square } from "@/components/square";
import { AnonymousTrend, Trend } from "@/types/trend";
import {
  IonButton,
  IonButtons,
  IonContent,
  IonHeader,
  IonIcon,
  IonPage,
  IonTitle,
  IonToolbar,
  IonItem,
  IonImg,
  IonAvatar,
  IonLabel,
} from "@ionic/react";
import { chevronBack } from "ionicons/icons";
import { useParams } from "react-router";
import User, { populate } from "./User";
import { useStartUrl } from "@/services/service/image/accessStartUrl";
import UserAvatar from "../../../../components/UserAvatar";

export const PostDetail = ({
  post,
  onClose,
}: {
  post: Trend | AnonymousTrend;
  onClose: () => void;
}) => {
  const { content, imageUrls } = post;
  const { data: startUrl } = useStartUrl();
  const { avatarUrl, nickname, title } = populate(post);
  return (
    <>
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            <IonButton onClick={onClose}>
              <IonIcon icon={chevronBack} />
            </IonButton>
          </IonButtons>
        </IonToolbar>
      </IonHeader>
      <IonContent>
        <div
          css={css`
            margin: 16px 32px;
          `}
        >
          <IonItem
            lines={"none"}
            className={"ion-no-padding"}
            style={{ marginBottom: "20px" }}
          >
            <UserAvatar
              src={avatarUrl}
              style={{ height: "60px", width: "60px", marginRight: "10px" }}
            />
            <IonLabel>
              <h2>{nickname}</h2>
              <p>{title ?? "社员"}</p>
            </IonLabel>
          </IonItem>

          <div>{content}</div>
          {!!imageUrls.length && (
            <div
              style={{ display: "flex", flexWrap: "wrap", marginTop: "8px" }}
            >
              {imageUrls.map((url) => {
                return (
                  <Square
                    key={url}
                    css={{
                      width: "calc(100%/3)",
                    }}
                  >
                    <IonImg
                      style={{ objectFit: "crop" }}
                      src={startUrl + url}
                      css={css`
                        height: 100%;
                        &::part(image) {
                          object-fit: cover;
                          border-radius: 8px;
                        }
                        padding: 4px;
                      `}
                    />
                  </Square>
                );
              })}
            </div>
          )}
        </div>
      </IonContent>
    </>
  );
};
