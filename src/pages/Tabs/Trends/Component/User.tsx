import * as React from "react";
import { IonAvatar, IonIcon, IonLabel, IonText } from "@ionic/react";
import { checkmarkOutline } from "ionicons/icons";
import { AnonymousTrend, Trend } from "@/types/trend";

export interface UserInfo {
  avatarUrl: string;
  nickname: string;
  title: string;
  authed?: boolean;
}

type UserProps = {
  post: Trend | AnonymousTrend;
};

export const populate = (info: Trend | AnonymousTrend) =>
  info.anonymous
    ? {
        avatarUrl:
          "http://5b0988e595225.cdn.sohucs.com/images/20180702/0a5cab43989c428286a58d5e81cf2445.png",
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
    <React.Fragment>
      <IonAvatar style={{ marginRight: 12 }} slot="start">
        <img src={avatarUrl} alt="" />
      </IonAvatar>
      <IonLabel>
        <h3>{nickname}</h3>
        <p>
          {title}
          {/* <IonText color="primary">
            {authed ? <IonIcon icon={checkmarkOutline} /> : undefined}
          </IonText> */}
        </p>
      </IonLabel>
    </React.Fragment>
  );
}

export default User;
