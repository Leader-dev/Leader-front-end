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
import ImageSelect from "@/components/imageSelect";
import { useState } from "react";
import { updateUserPortrait } from "@/services/user/info/updateAvatar";
import ToolbarWithBackButton from "@/components/ToolbarWithBackButton";
import UserAvatar from "@/components/UserAvatar";

export default () => {
  const { data: userInfo, error } = useUserInfo();
  const [avatar, setAvatar] = useState<File>();

  let content;
  if (!userInfo || error) {
    content = <div>loading</div>;
  } else {
    content = (
      <>
        <IonList>
          <IonItem detail={true}>
            <IonLabel>头像</IonLabel>
            <ImageSelect
              count={1}
              onChange={(images) => {
                updateUserPortrait(images[0]);
                setAvatar(images[0]);
              }}
            >
              <UserAvatar
                src={avatar ? URL.createObjectURL(avatar) : userInfo.avatarUrl}
                isObjectUrl={!!avatar}
                style={{ margin: "10px 0", height: "5vh", width: "5vh" }}
              />
            </ImageSelect>
          </IonItem>

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
          routerLink={"delete-user"}
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
