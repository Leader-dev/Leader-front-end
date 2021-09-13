import * as React from "react";
import {
  IonBadge,
  IonContent,
  IonHeader,
  IonItem,
  IonLabel,
  IonListHeader,
  IonPage,
} from "@ionic/react";
import ToolbarWithBackButton from "@/components/ToolbarWithBackButton";
import { useParams } from "react-router";
import { useRecruitManagerInfo } from "@/services/org/manage/apply/setting/getRecruitManagerInfo";

export default () => {
  const { orgId } = useParams<{ orgId: string }>();
  const { data: rootManagerInfo } = useRecruitManagerInfo({
    orgId: orgId,
    departmentId: null,
  });

  let content;
  if (rootManagerInfo) {
    content = rootManagerInfo.departments.length ? (
      rootManagerInfo.departments.map((department) => (
        <IonItem
          key={department.id}
          button
          routerLink={`departments/${department.id}`}
        >
          <IonLabel>{department.name}</IonLabel>
          <IonBadge slot={"end"} color={"primary"}>
            {department.recruitManagerCount}/1
          </IonBadge>
        </IonItem>
      ))
    ) : (
      <IonListHeader>
        <h6> 暂无部门 </h6>
      </IonListHeader>
    );
  } else {
    content = <div>Skeleton</div>;
  }

  return (
    <IonPage>
      <IonHeader>
        <ToolbarWithBackButton title={"添加各部门招新审核人"} border={true} />
      </IonHeader>
      <IonContent fullscreen>{content}</IonContent>
    </IonPage>
  );
};
