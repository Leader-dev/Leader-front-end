import {
  IonAvatar,
  IonButton,
  IonButtons,
  IonContent,
  IonHeader,
  IonIcon,
  IonImg,
  IonItem,
  IonItemDivider,
  IonLabel,
  IonList,
  IonListHeader,
  IonNote,
  IonPage,
  IonSearchbar,
  IonText,
  IonTitle,
  IonToolbar,
} from "@ionic/react";
import * as React from "react";
import { useParams } from "react-router";
import { useState } from "react";
import { checkmarkCircle, chevronBack } from "ionicons/icons";
import { useOrgDetails } from "@/services/org/detail";
import { useDepartmentList } from "@/services/org/manage/structure/listDepartments";
import { useOrgMemberList } from "@/services/org/manage/structure/listMembers";
import { OrgMember } from "@/types/organization";
import BottomConfirm from "@/components/BottomConfirm";

const Breadcrumb = ({
  path,
}: {
  path: { name: string; onClick?: () => void }[];
}) => {
  return (
    <IonItem>
      {path.map(({ name, onClick }, i) => {
        if (i !== path.length - 1) {
          return (
            <>
              <span onClick={onClick}>{name}</span>
              <span style={{ marginLeft: "3px", marginRight: "3px" }}>
                {" > "}
              </span>
            </>
          );
        } else {
          return (
            <IonText color={"primary"} onClick={onClick}>
              {name}
            </IonText>
          );
        }
      })}
    </IonItem>
  );
};

const MemberCard = ({
  memberInfo,
  selectedMembers,
  setSelectedMembers,
  limit,
}: {
  memberInfo: OrgMember;
  selectedMembers: OrgMember[];
  setSelectedMembers: any;
  limit: boolean;
}) => {
  const [selected, setSelected] = useState<boolean>(
    selectedMembers
      ? selectedMembers.findIndex((member) => member.id === memberInfo.id) !==
          -1
      : false
  );
  const handleOnSelect = () => {
    if (limit) {
      selected ? setSelectedMembers([]) : setSelectedMembers([memberInfo]);
    } else {
      const newList = [...selectedMembers];
      if (selected) {
        newList.splice(
          selectedMembers.findIndex((member) => member.id === memberInfo.id),
          1
        );
      } else {
        newList.push(memberInfo);
      }
      setSelectedMembers(newList);
    }
    setSelected(!selected);
  };

  return (
    <IonItem key={memberInfo.id} onClick={handleOnSelect}>
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
      {selected ? (
        <IonNote slot={"end"}>
          <IonIcon color={"primary"} icon={checkmarkCircle} />
        </IonNote>
      ) : (
        ""
      )}
    </IonItem>
  );
};

export default ({
  selectedMembers,
  setSelectedMembers,
  limit,
  onSubmit,
  onBack,
  title,
}: {
  selectedMembers: OrgMember[];
  setSelectedMembers: any;
  limit: boolean;
  onSubmit: any;
  onBack: any;
  title: string;
}) => {
  const [crumb, setCrumb] = useState<
    (undefined | { name: string; id: string })[]
  >([undefined]);
  const { orgId } = useParams<{ orgId: string }>();
  const departmentId = crumb[crumb.length - 1]?.id;
  // const departmentName = crumb[crumb.length - 1]?.name ?? "选择成员";

  const { data: departments } = useDepartmentList({
    orgId,
    parentId: departmentId,
  });
  const { data: memberList } = useOrgMemberList({
    orgId,
    departmentId: departmentId,
  });
  const { data: currentOrg } = useOrgDetails({ orgId });

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonButtons slot={"start"}>
            <IonButton onClick={onBack}>
              <IonIcon slot={"icon-only"} icon={chevronBack} />
            </IonButton>
          </IonButtons>
          <IonTitle>{title}</IonTitle>
        </IonToolbar>
        <IonToolbar>
          <IonSearchbar />
        </IonToolbar>
      </IonHeader>

      <IonContent fullscreen>
        <Breadcrumb
          path={[
            {
              name: currentOrg?.detail.name!,
              onClick: () => {
                setCrumb([undefined]);
              },
            },
            ...(crumb.slice(1) as { name: string; id: string }[]).map(
              (item, index) => {
                return {
                  ...item,
                  onClick: () => {
                    setCrumb((s) => s.slice(0, index + 2));
                  },
                };
              }
            ),
          ]}
        />
        <IonItemDivider />
        <IonList>
          <IonListHeader>
            <h6>已选中成员：</h6>
          </IonListHeader>
          {selectedMembers
            ? selectedMembers.map((member) => (
                <MemberCard
                  memberInfo={member}
                  selectedMembers={selectedMembers}
                  setSelectedMembers={setSelectedMembers}
                  limit={limit}
                />
              ))
            : "无"}

          <IonListHeader>
            <IonLabel>子部门：</IonLabel>
          </IonListHeader>
          {departments?.map((d) => {
            return (
              <IonItem
                detail
                key={d.id}
                onClick={() => {
                  setCrumb((c) => [...c, d]);
                }}
              >
                {d.name}
              </IonItem>
            );
          }) ?? "无"}

          <IonListHeader>
            <h6>{departmentId ? "成员" : "无部门成员"}：</h6>
          </IonListHeader>
          {memberList
            ?.filter((member) => member.roleName === "member")
            .map((member) => {
              return (
                <MemberCard
                  memberInfo={member}
                  selectedMembers={selectedMembers}
                  setSelectedMembers={setSelectedMembers}
                  limit={limit}
                />
              );
            }) ?? "无"}

          <IonListHeader>
            <h6>{departmentId ? "管理员" : "直隶管理员"}：</h6>
          </IonListHeader>
          {memberList
            ?.filter(
              (member) =>
                member.roleName ===
                (!departmentId ? "general-manager" : "department-manager")
            )
            .map((member) => {
              console.log({ member });
              return (
                <MemberCard
                  memberInfo={member}
                  selectedMembers={setSelectedMembers}
                  setSelectedMembers={setSelectedMembers}
                  limit={limit}
                />
              );
            }) ?? "无"}
        </IonList>
        <BottomConfirm title={"确认添加"} submit={false} onClick={onSubmit} />
      </IonContent>
    </IonPage>
  );
};
