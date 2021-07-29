import * as React from "react";
import {
  IonButtons,
  IonContent,
  IonHeader,
  IonPage,
  IonTitle,
  IonToolbar,
  IonBackButton,
  IonButton,
  IonInput,
  IonItem,
  useIonAlert,
  useIonRouter,
} from "@ionic/react";
import { chevronBack } from "ionicons/icons";
import { useState } from "react";
import { updateUserNickName } from "@/services/user/info/updateNickname";
import { useParams } from "react-router";

export default () => {
  const [nickname, setNickname] = useState<string>(
    useParams<{ nickname: string }>().nickname
  );
  const history = useIonRouter();
  const [present] = useIonAlert();

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            <IonBackButton text="" icon={chevronBack} />
          </IonButtons>
          <IonButtons slot="end">
            <IonButton
              onClick={() => {
                if (!nickname) {
                  present("昵称不得为空", [{ text: "确人" }]);
                } else {
                  updateUserNickName(nickname);
                  history.goBack();
                }
              }}
            >
              保存
            </IonButton>
          </IonButtons>
          <IonTitle>更新昵称</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <IonItem>
          <IonInput
            value={nickname}
            onIonChange={(e) => setNickname(e.detail.value!)}
            clearInput
          />
        </IonItem>
      </IonContent>
    </IonPage>
  );
};
