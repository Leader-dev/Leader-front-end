import * as React from "react";
import { IonContent, IonHeader, IonLoading, IonPage } from "@ionic/react";
import { ToolbarWithBackButton } from "@/components/ToolbarWithBackButton";
import { useUserAgreement } from "@/services/app/agreement";
import ReactMarkdown from "react-markdown";

export default () => {
  const { data, error } = useUserAgreement();
  if (!data) {
    return <IonLoading isOpen={true} message={"加载中"} />;
  }
  return (
    <IonPage>
      <IonHeader>
        <ToolbarWithBackButton title={"用户协议"} />
      </IonHeader>
      <IonContent fullscreen>
        <ReactMarkdown>{data}</ReactMarkdown>
      </IonContent>
    </IonPage>
  );
};
