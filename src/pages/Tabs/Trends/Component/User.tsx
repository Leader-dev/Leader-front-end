import * as React from "react";
import { IonIcon, IonItem, IonLabel } from "@ionic/react";
import { checkmarkOutline } from "ionicons/icons";
import { AnonymousTrend, Trend } from "@/types/trend";
import UserAvatar from "@/components/UserAvatar";

type UserProps = {
  post: Trend | AnonymousTrend;
};

export const populate = (info: Trend | AnonymousTrend) =>
  info.anonymous
    ? {
        avatarUrl: null,
        nickname: "鳞者用户",
        title: `社员`,
      }
    : {
        avatarUrl: info.puppetInfo.avatarUrl,
        nickname: info.puppetInfo.nickname,
        title: info.orgTitle,
      };

// Must be wrapped in IonItem tag
function User({ post }: UserProps) {
  const { avatarUrl, nickname, title } = populate(post);

  return (
    <IonItem lines={"none"} className={"ion-no-padding"}>
      <UserAvatar src={avatarUrl} />
      <IonLabel>
        <h3>{nickname}</h3>
        <p>
          {title}
          {/* <IonText color="primary">
          {authed ? <IonIcon icon={checkmarkOutline} /> : undefined}
        </IonText> */}
        </p>
      </IonLabel>
    </IonItem>
  );
}

export default User;
