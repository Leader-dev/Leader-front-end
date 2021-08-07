import * as React from "react";
import { IonContent, IonHeader, IonLoading, IonPage } from "@ionic/react";
import ToolbarWithBackButton from "@/components/ToolbarWithBackButton";
import ReactMarkdown from "react-markdown";
import { usePrivacyAgreement } from "@/services/app/privacy";

export default () => {
  const { data, error } = usePrivacyAgreement();

  if (!data) {
    return <IonLoading isOpen={true} message={"加载中"} />;
  }
  return (
    <IonPage>
      <IonHeader>
        <ToolbarWithBackButton title={"隐私政策"} border={true} />
      </IonHeader>
      <IonContent fullscreen>
        <ReactMarkdown>{data}</ReactMarkdown>
      </IonContent>
    </IonPage>
  );
};
