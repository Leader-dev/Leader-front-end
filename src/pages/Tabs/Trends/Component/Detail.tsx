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
} from "@ionic/react";
import { chevronBack } from "ionicons/icons";
import { useParams } from "react-router";
import User, { populate } from "./User";
import { useStartUrl } from "@/services/service/image/accessStartUrl";

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
          <IonTitle>{post.id}</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent>
        <div
          css={css`
            margin: 16px 32px;
          `}
        >
          <div
            css={css`
              display: flex;
              & h3 {
                margin-top: 10px;
              }
              margin-bottom: 8px;
            `}
          >
            <IonAvatar
              css={css`
                height: 80px;
                width: 80px;
              `}
            >
              <IonImg src={avatarUrl} />
            </IonAvatar>

            <div
              css={css`
                margin-left: 12px;
              `}
            >
              <h3>{nickname}</h3>
              <span>{title}</span>
            </div>
          </div>
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
