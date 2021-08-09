import { useOrgDetails } from "@/services/org/detail";
import { useDepartmentList } from "@/services/org/manage/structure/listDepartments";
import { useOrgMemberList } from "@/services/org/manage/structure/listMembers";
import * as React from "react";
import {
  IonContent,
  IonHeader,
  IonItem,
  IonItemDivider,
  IonLabel,
  IonList,
  IonListHeader,
  IonPage,
  IonSearchbar,
  IonToolbar,
} from "@ionic/react";
import { useParams, Route, Switch } from "react-router";
import { useOrgMemberInfo } from "@/services/org/manage/structure/memberInfo";
import ToolbarWithBackButton from "@/components/ToolbarWithBackButton";
import { useState } from "react";
import Breadcrumb from "@/pages/Org/components/Breadcrumb";
import MemberCard from "@/pages/Org/components/MemberCard";

const MemberManagement = () => {
  const { orgId } = useParams<{ orgId: string }>();

  const [crumb, setCrumb] = useState<
    (undefined | { name: string; id: string })[]
  >([undefined]);
  const departmentId = crumb[crumb.length - 1]?.id;
  const departmentName = crumb[crumb.length - 1]?.name ?? "组织架构";

  const { data: currentOrg } = useOrgDetails({ orgId });
  const { data: departments } = useDepartmentList({
    orgId,
    parentId: departmentId,
  });
  const { data: memberList } = useOrgMemberList({
    orgId,
    departmentId: departmentId,
  });

  let content;
  if (currentOrg && departments && memberList) {
    const managers = memberList.filter((member) =>
      !departmentId
        ? ["general-manager", "president"]
        : ["department-manager"].includes(member.roleName)
    );
    const members = memberList.filter((member) => member.roleName === "member");

    content = (
      <IonList>
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

        <IonListHeader>
          <h5>子部门：</h5>
        </IonListHeader>
        {departments.length ? (
          departments.map((d) => (
            <IonItem
              detail
              key={d.id}
              onClick={() => {
                setCrumb((c) => [...c, d]);
              }}
            >
              {d.name}
            </IonItem>
          ))
        ) : (
          <IonItem lines={"none"}>
            <IonLabel>无</IonLabel>
          </IonItem>
        )}

        <IonListHeader>
          <h5>{departmentId ? "管理员" : "直隶管理员"}：</h5>
        </IonListHeader>
        {managers.length ? (
          managers.map((member) => (
            <MemberCard
              memberInfo={member}
              routerLink={`members/${member.id}`}
            />
          ))
        ) : (
          <IonItem lines={"none"}>
            <IonLabel>无</IonLabel>
          </IonItem>
        )}

        <IonListHeader>
          <h5>{departmentId ? "成员" : "无部门成员"}：</h5>
        </IonListHeader>
        {members.length ? (
          members.map((member) => (
            <MemberCard
              memberInfo={member}
              routerLink={`members/${member.id}`}
            />
          ))
        ) : (
          <IonItem lines={"none"}>
            <IonLabel>无</IonLabel>
          </IonItem>
        )}
      </IonList>
    );
  } else {
    content = <div>Skeleton</div>;
  }

  return (
    <IonPage>
      <IonHeader>
        <ToolbarWithBackButton
          title={"咨询成员"}
          border={false}
          defaultHref={`/org/${orgId}/home`}
        />
        <IonToolbar>
          <IonSearchbar />
        </IonToolbar>
      </IonHeader>
      <IonContent>
        {/*{departmentId ? (*/}
        {/*  <IonList>*/}
        {/*    {memberList?.map((member) => {*/}
        {/*      console.log({ member });*/}
        {/*      return (*/}
        {/*        <IonItem*/}
        {/*          key={member.id}*/}
        {/*          routerLink={`/org/${orgId}/members/${member.id}`}*/}
        {/*        >*/}
        {/*          {member.avatarUrl && (*/}
        {/*            <IonAvatar slot="start">*/}
        {/*              <img src={member.avatarUrl} />*/}
        {/*            </IonAvatar>*/}
        {/*          )}*/}
        {/*          <IonLabel>{member.name}</IonLabel>*/}
        {/*        </IonItem>*/}
        {/*      );*/}
        {/*    })}*/}
        {/*  </IonList>*/}
        {/*) : (*/}
        {/*  <IonList>*/}
        {/*    <IonItem*/}
        {/*      detail*/}
        {/*      onClick={() => {*/}
        {/*        history.push({ search: `?department=none` });*/}
        {/*      }}*/}
        {/*    >*/}
        {/*      <IonLabel>{currentOrg?.detail.name}</IonLabel>*/}
        {/*    </IonItem>*/}
        {/*    {loading*/}
        {/*      ? null*/}
        {/*      : departments?.map((dp) => {*/}
        {/*          return (*/}
        {/*            <IonItem*/}
        {/*              detail*/}
        {/*              onClick={() => {*/}
        {/*                history.push({ search: `?department=${dp.id}` });*/}
        {/*              }}*/}
        {/*            >*/}
        {/*              <IonLabel>{dp.name}</IonLabel>*/}
        {/*            </IonItem>*/}
        {/*          );*/}
        {/*        })}*/}
        {/*  </IonList>*/}
        {/*)}*/}
        {content}
      </IonContent>
    </IonPage>
  );
};

const Label = ({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) => (
  <div style={{ margin: "12px 16px" }}>
    <h3>{title}：</h3>
    <div>{children}</div>
  </div>
);

const MemberInfo = () => {
  const { orgId, memberId } = useParams<{ orgId: string; memberId: string }>();
  const { data: info } = useOrgMemberInfo({ orgId, memberId });
  return (
    <IonPage>
      <IonHeader>
        <ToolbarWithBackButton title={info?.departmentName ?? "无部门成员"} />
      </IonHeader>
      {/* TODO: Check for if can modify title and has title */}
      <IonContent>
        <div style={{ textAlign: "center", margin: "32px 0" }}>
          <div style={{ fontSize: "24px", marginBottom: "8px" }}>
            {info?.name}
          </div>
          <div>{info?.numberId}</div>
        </div>
        <Label title="姓名">{info?.name}</Label>
        <Label title="联系电话">
          {info?.phone?.map((p) => <div key={p}>{p}</div>) ?? "无"}
        </Label>
        <Label title="邮箱">
          {info?.email?.map((p) => <div key={p}>{p}</div>) ?? "无"}
        </Label>
        <Label title="现任部门名称">{info?.departmentName ?? "无"}</Label>
      </IonContent>
    </IonPage>
  );
};

export default () => {
  return (
    <Switch>
      <Route path="/org/:orgId/members/:memberId" component={MemberInfo} />
      <Route component={MemberManagement} />
    </Switch>
  );
};
