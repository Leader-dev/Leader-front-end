/** @jsxImportSource @emotion/react */
import { IonIcon, IonImg, IonItem, IonLabel, IonNote } from "@ionic/react";
import { css } from "@emotion/react";
import { useStartUrl } from "@/services/service/image/accessStartUrl";
import { Square } from "@/components/square";
import { chevronForward, ellipse } from "ionicons/icons";
import { NotificationDetail } from "@/types/recruit";
import { NotificationOverview } from "@/types/recruit";

export const NotificationItem = ({
  info,
  routerLink,
  showUnread,
}: {
  info: NotificationOverview;
  routerLink: string;
  showUnread: boolean;
}) => {
  const time = new Date(info.sendDate);
  return (
    <IonItem
      button
      detailIcon={chevronForward}
      key={info.id}
      routerLink={routerLink}
    >
      <IonLabel>
        <h2>{info.title}</h2>
        <p>
          {`${time.getFullYear()}年${time.getMonth() + 1}月${time.getDate()}日 
          ${time.getHours()}:${time.getMinutes()}`}
        </p>
      </IonLabel>
      {showUnread && info.unread ? (
        <IonNote slot={"end"}>
          <IonIcon
            color={"danger"}
            style={{ fontSize: "80%" }}
            icon={ellipse}
          />
        </IonNote>
      ) : null}
    </IonItem>
  );
};

export const NotificationDetailContent = ({
  info,
}: {
  info: NotificationDetail;
}) => {
  const time = new Date(info.sendDate);
  const { data: startUrl } = useStartUrl();

  return (
    <div style={{ padding: "15px 5vw" }}>
      <div style={{ textAlign: "center", color: "var(--ion-color-primary)" }}>
        {`${time.getFullYear()}年${time.getMonth() + 1}月${time.getDate()}日 
          ${time.getHours()}:${time.getMinutes()}`}
      </div>
      <p>{info.content}</p>
      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          gap: "2%",
          marginTop: "10px",
        }}
      >
        {info.imageUrls.map((url) => (
          <Square
            key={url}
            css={{
              width: "48%",
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
              `}
            />
          </Square>
        ))}
      </div>
    </div>
  );
};

export const NotificationDetailSkeleton = () => {
  return <div> loading </div>;
};
