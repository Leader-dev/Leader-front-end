import {
  IonContent,
  IonHeader,
  IonPage,
  IonSearchbar,
  IonToolbar,
  useIonRouter,
} from "@ionic/react";
import * as React from "react";
import { useEffect, useState } from "react";
import { useParams } from "react-router";
import { useOrgDetails } from "@/services/org/detail";
import { OrgMember } from "@/types/organization";
import BottomButton from "@/components/BottomButton";
import { useRecruitManagerInfo } from "@/services/org/manage/apply/setting/getRecruitManagerInfo";
import { setRecruitMangerInfo } from "@/services/org/manage/apply/setting/setRecruitMangerInfo";
import ToolbarWithBackButton from "@/components/ToolbarWithBackButton";
import OrgStructure from "@/pages/Org/components/OrgStructure";
import { useToast } from "@/utils/toast";

export default () => {
  const { orgId } = useParams<{ orgId: string }>();
  const { departmentId } = useParams<{ departmentId: string }>();

  const [selectedMembers, setSelectedMembers] = useState<OrgMember[]>([]);
  const { data: departmentManager } = useRecruitManagerInfo({
    orgId: orgId,
    departmentId: departmentId,
  });

  useEffect(() => {
    if (departmentManager) {
      setSelectedMembers(
        departmentManager.memberInfo ? [departmentManager.memberInfo] : []
      );
    }
  }, [departmentManager]);

  const { data: currentOrg } = useOrgDetails({ orgId });

  const history = useIonRouter();
  const [toast] = useToast();

  const onSubmit = () => {
    setRecruitMangerInfo({
      orgId: orgId,
      departmentId: departmentId,
      memberId: selectedMembers[0] ? selectedMembers[0].id : null,
    }).then(() => {
      toast({ message: "设置成功" });
      history.goBack();
    });
  };

  const handleOnSelect = (memberInfo: OrgMember, selected: boolean) => {
    selected ? setSelectedMembers([]) : setSelectedMembers([memberInfo]);
  };

  let content;
  if (currentOrg && departmentManager) {
    content = (
      <>
        <OrgStructure
          orgName={currentOrg?.detail.name!}
          orgId={orgId}
          selectedOptions={{
            selectedMembers: selectedMembers,
            handleOnSelect: handleOnSelect,
            currDepartmentId: departmentId,
          }}
        />
        <BottomButton content={"确认添加"} onClick={onSubmit} />
      </>
    );
  } else {
    content = <div>Skeleton</div>;
  }

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <ToolbarWithBackButton title={"选择招新审核员"} border={false} />
        </IonToolbar>
        <IonToolbar>
          <IonSearchbar />
        </IonToolbar>
      </IonHeader>

      <IonContent fullscreen>{content}</IonContent>
    </IonPage>
  );
};
