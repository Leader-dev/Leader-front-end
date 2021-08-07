import * as React from "react";
import {
  IonAvatar,
  IonContent,
  IonHeader,
  IonImg,
  IonItem,
  IonLabel,
  IonList,
  IonNote,
  IonPage,
  IonButton,
} from "@ionic/react";
import { useUserInfo } from "@/services/user/info/get";
import { useStartUrl } from "@/services/service/image/accessStartUrl";
import ImageSelect from "@/components/imageSelect";
import { useState } from "react";
import { updateUserPortrait } from "@/services/user/info/updateAvatar";
import ToolbarWithBackButton from "@/components/ToolbarWithBackButton";

export default () => {
  const { data: userInfo, error } = useUserInfo();
  const { data: startUrl } = useStartUrl();
  const [avatar, setAvatar] = useState<File>();

  let content;
  if (!userInfo || error) {
    content = <div>loading</div>;
  } else {
    content = (
      <>
        <IonList>
          <ImageSelect
            count={1}
            onChange={(images) => {
              updateUserPortrait(images[0]);
              setAvatar(images[0]);
            }}
          >
            <IonItem>
              <IonLabel>头像</IonLabel>
              <IonAvatar style={{ height: "5vh", width: "5vh" }} slot="end">
                <IonImg
                  src={
                    avatar
                      ? URL.createObjectURL(avatar)
                      : startUrl + userInfo.avatarUrl
                  }
                />
              </IonAvatar>
            </IonItem>
          </ImageSelect>

          <IonItem button routerLink={`update-nickname/${userInfo.nickname}`}>
            <IonLabel>昵称</IonLabel>
            <IonNote slot="end">{userInfo.nickname}</IonNote>
          </IonItem>

          <IonItem>
            <IonLabel>UID</IonLabel>
            <IonNote slot="end">{userInfo.uid}</IonNote>
          </IonItem>

          <IonItem button routerLink={"update-password"}>
            <IonLabel>修改密码</IonLabel>
          </IonItem>
        </IonList>
        <IonButton
          style={{ margin: "25px 15px" }}
          expand="block"
          type="submit"
          color="danger"
        >
          注销账户
        </IonButton>
      </>
    );
  }

  return (
    <IonPage>
      <IonHeader>
        <ToolbarWithBackButton title={"账号与安全"} border={true} />
      </IonHeader>
      <IonContent fullscreen>{content}</IonContent>
    </IonPage>
  );
};
