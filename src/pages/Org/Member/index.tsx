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
import OrgStructure from "@/pages/Org/components/OrgStructure";
import UserAvatar from "../../../components/UserAvatar";

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
    content = (
      <OrgStructure
        orgName={currentOrg.detail.name!}
        orgId={orgId}
        startRouterLink={"members"}
      />
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
      <IonContent>{content}</IonContent>
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
  <div style={{ margin: "20px 24px" }}>
    <h4>{title}：</h4>
    <div>{children}</div>
  </div>
);

const MemberInfo = () => {
  const { orgId, memberId } = useParams<{ orgId: string; memberId: string }>();
  const { data: info } = useOrgMemberInfo({ orgId, memberId });
  return (
    <IonPage>
      <IonHeader>
        <ToolbarWithBackButton title={info?.departmentName ?? undefined} />
      </IonHeader>
      {/* TODO: Check for if can modify title and has title */}
      <IonContent>
        <div style={{ textAlign: "center", margin: "32px 0" }}>
          <UserAvatar
            src={info?.avatarUrl ?? null}
            style={{ height: "128px", width: "128px", margin: "0 auto 10px" }}
          />
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
