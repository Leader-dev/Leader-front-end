import React from 'react';
import {IonAvatar, IonIcon, IonLabel, IonText} from "@ionic/react";
import {checkmarkOutline} from "ionicons/icons";

export interface UserInfo {
  userAvatar: string
  username: string
  userTitle: string
  authed?: boolean
}

export interface UserProps {
  info: UserInfo
}

// Must be wrapped in IonItem tag
function User({ info: { userAvatar, username, userTitle, authed } }: UserProps) {
  return (
    <React.Fragment>
      <IonAvatar style={{ marginRight: 12 }} slot="start">
        <img src={ userAvatar } alt="" />
      </IonAvatar>
      <IonLabel>
        <h3>{ username }</h3>
        <p>
          { userTitle }
          <IonText color="primary">
            { authed ? <IonIcon icon={checkmarkOutline} /> : undefined }
          </IonText>
        </p>
      </IonLabel>
    </React.Fragment>
  )
}

export default User
