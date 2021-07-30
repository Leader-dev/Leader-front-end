import * as React from "react";
import {
  IonButtons,
  IonContent,
  IonHeader,
  IonPage,
  IonToolbar,
  IonBackButton,
  IonTitle,
  IonLabel,
  IonToggle,
  IonItem,
  IonInput,
  IonButton,
} from "@ionic/react";
import { chevronBack } from "ionicons/icons";
import { useOrgApplicationSetting } from "@/services/org/manage/apply/setting/getScheme";
import { useParams } from "react-router";
import SettingForm from "./components/SettingForm";
import { ToolbarWithBackButton } from "../../../../components/ToolbarWithBackButton";

export default () => {
  const { orgId } = useParams<{ orgId: string }>();
  const { data, error } = useOrgApplicationSetting({ orgId });

  let content;
  if (!data) {
    content = "";
  } else {
    content = <SettingForm recruitInfo={data} />;
  }
  return (
    <IonPage>
      <IonHeader>
        <ToolbarWithBackButton title={"招新设置"} />
      </IonHeader>
      <IonContent fullscreen>{content}</IonContent>
    </IonPage>
  );
};
