import * as React from "react";
import {
  IonAvatar,
  IonBadge,
  IonButton,
  IonContent,
  IonHeader,
  IonIcon,
  IonImg,
  IonItem,
  IonLabel,
  IonList,
  IonListHeader,
  IonNote,
  IonPage,
  IonText,
} from "@ionic/react";
import { ToolbarWithBackButton } from "@/components/ToolbarWithBackButton";
import { useDepartmentList } from "@/services/org/manage/structure/listDepartments";
import { useParams } from "react-router";
import { useRecruitManagerInfo } from "@/services/org/manage/apply/setting/getRecruitManagerInfo";
import { useOrgMemberList } from "@/services/org/manage/structure/listMembers";
import { OrgMember } from "@/types/organization";
import { checkmarkCircle } from "ionicons/icons";
import { useEffect, useState } from "react";

const MemberCard = ({
  memberInfo,
  index,
  select,
  onSelect,
}: {
  memberInfo: OrgMember;
  index: number;
  select: boolean[];
  onSelect: any;
}) => {
  return (
    <IonItem key={index} onClick={onSelect}>
      <IonAvatar slot={"start"}>
        <IonImg src={memberInfo.avatarUrl} />
      </IonAvatar>
      <IonLabel>
        <h3>
          {memberInfo.name}
          <IonText color={"primary"}>{memberInfo.title}</IonText>
        </h3>
        <p>
          <IonText color={"primary"}>成员号:</IonText>
          {memberInfo.id}
        </p>
      </IonLabel>
      {select[index] ? (
        <IonNote slot={"end"}>
          <IonIcon color={"primary"} icon={checkmarkCircle} />
        </IonNote>
      ) : (
        ""
      )}
    </IonItem>
  );
};

export const DepartmentPage = () => {
  const { orgId } = useParams<{ orgId: string }>();
  const { departmentId } = useParams<{ departmentId: string }>();
  const { data: members, error: membersError } = useOrgMemberList({
    orgId: orgId,
    departmentId: departmentId,
  });
  const { data: recruitManager, error: recruitManagerError } =
    useRecruitManagerInfo({ orgId: orgId, departmentId: departmentId });
  const [select, setSelect] = useState<boolean[]>([]);

  useEffect(() => {
    if (members) {
      setSelect(Array(members.length).fill(false));
    }
  }, [members]);

  let content;
  let departmentName = "";
  if (recruitManager && members) {
    departmentName = recruitManager.departments.name;

    const counts = (arr: Array<any>, value: any) =>
      arr.reduce((a, v) => (v === value ? a + 1 : a), 0);

    const checkSelect = (index: any) => {
      if (select[index]) {
        if (
          counts(select, true) <= recruitManager.departments.recruitManagerCount
        ) {
          let newSelect = [...select];
          newSelect[index] = !newSelect[index];
          setSelect(newSelect);
        }
      } else {
        let newSelect = [...select];
        newSelect[index] = !newSelect[index];
        setSelect(newSelect);
      }
    };

    content = (
      <>
        <IonList>
          <IonListHeader>
            <h5>添加招新审核人：</h5>
            <IonBadge>
              {" "}
              {recruitManager.memberId
                ? recruitManager.memberId.length
                : 0}/1{" "}
            </IonBadge>
          </IonListHeader>
          {members.map((member, index) => {
            if (recruitManager.memberId.indexOf(member.id) !== -1) {
              let newSelect = [...select];
              newSelect[index] = true;
              setSelect(newSelect);
            }
            return (
              <MemberCard
                memberInfo={member}
                index={index}
                select={select}
                onSelect={() => checkSelect(index)}
              />
            );
          })}
        </IonList>
        <IonButton style={{ margin: "25px 15px" }} expand="block">
          确认
        </IonButton>
      </>
    );
  } else {
    content = <div> Skeleton </div>;
  }

  return (
    <IonPage>
      <IonHeader>
        <ToolbarWithBackButton title={departmentName} />
      </IonHeader>
      <IonContent fullscreen>{content}</IonContent>
    </IonPage>
  );
};

export const DepartmentSettings = () => {
  const { orgId } = useParams<{ orgId: string }>();
  const { data: departments, error: departmentsError } = useDepartmentList({
    orgId,
  });

  let content;
  if (!departments) {
    content = <div>skeleton</div>;
  } else {
    content = departments.map((department, index) => {
      // const {data, error} = useRecruitManagerInfo({orgId: orgId, departmentId: department.id})
      return (
        <IonItem
          key={index}
          button
          routerLink={`/departments/${department.id}`}
        >
          <IonLabel>{department}</IonLabel>
          {/*<IonBadge slot={"end"} color={"primary"}>*/}
          {/*  {data.memberId ? data.memberId.length : 0}*/}
          {/*  /1*/}
          {/*</IonBadge>*/}
        </IonItem>
      );
    });
  }
  return (
    <IonPage>
      <IonHeader>
        <ToolbarWithBackButton title={"添加各部门招新审核人"} />
      </IonHeader>
      <IonContent fullscreen>
        <IonListHeader>
          <h5>选择部门</h5>
        </IonListHeader>
        {content}
      </IonContent>
    </IonPage>
  );
};

export default DepartmentSettings;
