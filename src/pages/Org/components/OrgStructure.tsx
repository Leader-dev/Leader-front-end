import * as React from "react";
import {
  IonItem,
  IonItemDivider,
  IonLabel,
  IonList,
  IonListHeader,
  IonText,
} from "@ionic/react";
import MemberCard from "./MemberCard";
import { useState } from "react";
import { useDepartmentList } from "@/services/org/manage/structure/listDepartments";
import { useOrgMemberList } from "@/services/org/manage/structure/listMembers";
import { OrgMember } from "@/types/organization";

export const Breadcrumb = ({
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
              <IonText color={"primary"} onClick={onClick}>
                {name}
              </IonText>
              <span style={{ marginLeft: "3px", marginRight: "3px" }}>
                {" > "}
              </span>
            </>
          );
        } else {
          return <span onClick={onClick}>{name}</span>;
        }
      })}
    </IonItem>
  );
};

const selectedMembers = ({
  selectedMembers,
  handleOnSelect,
}: {
  selectedMembers: OrgMember[];
  handleOnSelect: (memberInfo: OrgMember, selected: boolean) => void;
}) => {
  return (
    <>
      <IonListHeader>
        <h5>已选中成员：</h5>
      </IonListHeader>
      {selectedMembers[0] ? (
        selectedMembers.map((member) => (
          <MemberCard
            memberInfo={member}
            selected={true}
            handleOnClick={() => handleOnSelect(member, true)}
          />
        ))
      ) : (
        <IonItem lines={"none"}>
          <IonLabel>无</IonLabel>
        </IonItem>
      )}
      <div style={{ height: "15px" }} />

      <IonItemDivider />
    </>
  );
};

interface selectedOpts {
  selectedMembers: OrgMember[];
  handleOnSelect: (memberInfo: OrgMember, selected: boolean) => void;
}

export default ({
  orgName,
  orgId,
  selectedOptions,
  startRouterLink,
}: {
  orgName: string;
  orgId: string;
  selectedOptions?: selectedOpts;
  startRouterLink?: string;
}) => {
  const [crumb, setCrumb] = useState<
    (undefined | { name: string; id: string })[]
  >([undefined]);
  const childDpId = crumb[crumb.length - 1]?.id;

  const { data: departments } = useDepartmentList({
    orgId,
    parentId: childDpId,
  });
  const { data: memberList } = useOrgMemberList({
    orgId,
    departmentId: childDpId,
  });

  let content;
  if (departments && memberList) {
    const managers = memberList.filter((member) =>
      !childDpId ? ["general-manager", "president"] : ["department-manager"]
    );
    const members = memberList.filter((member) => member.roleName === "member");
    content = (
      <IonList>
        <Breadcrumb
          path={[
            {
              name: orgName,
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

        <IonListHeader>
          <h5>子部门：</h5>
        </IonListHeader>
        {departments.length ? (
          departments.map((d) => {
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
          })
        ) : (
          <IonItem lines={"none"}>
            <IonLabel>无</IonLabel>
          </IonItem>
        )}

        <IonListHeader>
          <h5>{childDpId ? "管理员" : "直隶管理员"}：</h5>
        </IonListHeader>
        {managers.length ? (
          managers.map((member) => {
            if (selectedOptions) {
              const selected = selectedOptions.selectedMembers.some(
                (selectedMember) => selectedMember.id === member.id
              );
              return (
                <MemberCard
                  memberInfo={member}
                  handleOnClick={() =>
                    selectedOptions.handleOnSelect(member, selected)
                  }
                  selected={selected}
                />
              );
            } else {
              return (
                <MemberCard
                  memberInfo={member}
                  routerLink={startRouterLink + `/${member.id}`}
                />
              );
            }
          })
        ) : (
          <IonItem lines={"none"}>
            <IonLabel>无</IonLabel>
          </IonItem>
        )}

        <IonListHeader>
          <h5>{childDpId ? "成员" : "无部门成员"}：</h5>
        </IonListHeader>
        {members.length ? (
          members.map((member) => {
            if (selectedOptions) {
              const selected = selectedOptions.selectedMembers.some(
                (selectedMember) => selectedMember.id === member.id
              );
              return (
                <MemberCard
                  memberInfo={member}
                  handleOnClick={() =>
                    selectedOptions.handleOnSelect(member, selected)
                  }
                  selected={selected}
                />
              );
            } else {
              return (
                <MemberCard
                  memberInfo={member}
                  routerLink={startRouterLink + `/${member.id}`}
                />
              );
            }
          })
        ) : (
          <IonItem lines={"none"}>
            <IonLabel>无</IonLabel>
          </IonItem>
        )}
      </IonList>
    );
  } else {
    content = <div> Skeleton </div>;
  }

  return content;
};
