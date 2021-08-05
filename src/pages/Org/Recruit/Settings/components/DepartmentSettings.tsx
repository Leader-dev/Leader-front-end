import * as React from "react";
import {
  IonBadge,
  IonContent,
  IonHeader,
  IonItem,
  IonLabel,
  IonPage,
  useIonRouter,
} from "@ionic/react";
import { ToolbarWithBackButton } from "@/components/ToolbarWithBackButton";
import { useParams } from "react-router";
import { useRecruitManagerInfo } from "@/services/org/manage/apply/setting/getRecruitManagerInfo";
import { OrgMember } from "@/types/organization";
import { useEffect, useState } from "react";
import { setRecruitMangerInfo } from "@/services/org/manage/apply/setting/setRecruitMangerInfo";
import SelectMembers from "@/pages/Org/components/SelectMembers";

export default () => {
  const { orgId } = useParams<{ orgId: string }>();
  const { data: rootManagerInfo, error: rootMangerInfoError } =
    useRecruitManagerInfo({ orgId: orgId, departmentId: null });
  const [selectedMembers, setSelectedMembers] = useState<OrgMember[]>([]);
  const [currDepartment, setCurrentDepartment] =
    useState<{ id: string; name: string } | undefined>(undefined);

  const history = useIonRouter();

  useEffect(() => {
    if (rootManagerInfo) {
      setSelectedMembers([rootManagerInfo.manager]);
    }
  });

  const handleOnSubmit = (departmentId: string) => {
    setRecruitMangerInfo({
      orgId: orgId,
      departmentId: departmentId,
      memberId: selectedMembers[0].id,
    }).then(() => history.goBack());
  };

  if (rootManagerInfo) {
    if (!currDepartment) {
      return (
        <IonPage>
          <IonHeader>
            <ToolbarWithBackButton title={"添加各部门招新审核人"} />
          </IonHeader>
          <IonContent fullscreen>
            {rootManagerInfo.departments?.map((department) => (
              <IonItem button onClick={() => setCurrentDepartment(department)}>
                <IonLabel>{department.name}</IonLabel>
                <IonBadge slot={"end"} color={"primary"}>
                  {department.recruitManagerCount}/1
                </IonBadge>
              </IonItem>
            ))}
          </IonContent>
        </IonPage>
      );
    } else {
      return (
        <SelectMembers
          selectedMembers={selectedMembers}
          setSelectedMembers={setSelectedMembers}
          limit={true}
          onSubmit={() => handleOnSubmit(currDepartment.id)}
          onBack={() => setCurrentDepartment(undefined)}
          title={"设置" + currDepartment.name + "招新管理员"}
        />
      );
    }
  } else {
    return (
      <IonPage>
        <div>Loading</div>
      </IonPage>
    );
  }
};
