import * as React from "react";
import { IonContent, IonHeader, IonPage } from "@ionic/react";
import { useOrgApplicationScheme } from "@/services/org/manage/apply/setting/getScheme";
import { useParams } from "react-router";
import SettingForm from "./components/SettingForm";
import ToolbarWithBackButton from "@/components/ToolbarWithBackButton";
import { useDepartmentList } from "@/services/org/manage/structure/listDepartments";

export default () => {
  const { orgId } = useParams<{ orgId: string }>();
  const { data: applicationScheme } = useOrgApplicationScheme({ orgId });
  const { data: departments } = useDepartmentList({ orgId });

  let content;
  if (!applicationScheme || !departments) {
    content = <div>Skeleton</div>;
  } else {
    content = (
      <SettingForm
        recruitInfo={applicationScheme}
        hasDepartments={!!departments.length}
      />
    );
  }
  return (
    <IonPage>
      <IonHeader>
        <ToolbarWithBackButton title={"招新设置"} border={true} />
      </IonHeader>
      <IonContent fullscreen>{content}</IonContent>
    </IonPage>
  );
};
