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
import { Route, Switch, useParams } from "react-router";
import SettingForm from "./components/SettingForm";

const RecruitSettings = () => {
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
        <IonToolbar>
          <IonButtons>
            <IonBackButton text="" icon={chevronBack} />
          </IonButtons>
          <IonTitle>招新设置</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>{content}</IonContent>
    </IonPage>
  );
};

export default () => {
  return (
    <Switch>
      <Route path="/org/:orgId/recruit/settings" component={RecruitSettings} />
    </Switch>
  );
};
