import { useOrgDetails } from "@/services/org/detail";
import { useDepartmentList } from "@/services/org/manage/structure/listDepartments";
import { useOrgMemberList } from "@/services/org/manage/structure/listMembers";
import * as React from "react";
import {
  IonAvatar,
  IonBackButton,
  IonButton,
  IonButtons,
  IonContent,
  IonHeader,
  IonIcon,
  IonItem,
  IonLabel,
  IonList,
  IonPage,
  IonSearchbar,
  IonTitle,
  IonToolbar,
} from "@ionic/react";
import { chevronBack, chevronBackOutline } from "ionicons/icons";
import {
  useLocation,
  useParams,
  useHistory,
  Route,
  Switch,
} from "react-router";
import { useOrgMemberInfo } from "@/services/org/manage/structure/memberInfo";

function useQuery() {
  return new URLSearchParams(useLocation().search);
}

const MemberManagement = () => {
  const history = useHistory();
  const { orgId } = useParams<{ orgId: string }>();
  const departmentId = useQuery().get("department") || undefined;
  const { data: currentOrg } = useOrgDetails({ orgId });
  const {
    data: departments,
    error,
    isValidating,
  } = useDepartmentList({
    orgId,
    parentId: departmentId,
  });
  const { data: memberList } = useOrgMemberList({
    orgId,
    departmentId: departmentId === "none" ? undefined : departmentId,
  });
  const loading = !error && isValidating;
  console.log({ currentOrg });
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            {departmentId ? (
              <IonButton
                onClick={() => {
                  history.push({ search: `?` });
                }}
              >
                <IonIcon icon={chevronBack} />
              </IonButton>
            ) : (
              <IonBackButton defaultHref={`/org/${orgId}/home`} />
            )}
          </IonButtons>
          <IonTitle>咨询成员</IonTitle>
        </IonToolbar>
        <IonToolbar>
          <IonSearchbar />
        </IonToolbar>
      </IonHeader>
      <IonContent>
        {departmentId ? (
          <IonList>
            {memberList?.map((member) => {
              console.log({ member });
              return (
                <IonItem
                  key={member.id}
                  routerLink={`/org/${orgId}/members/${member.id}`}
                >
                  {member.avatarUrl && (
                    <IonAvatar slot="start">
                      <img src={member.avatarUrl} />
                    </IonAvatar>
                  )}
                  <IonLabel>{member.name}</IonLabel>
                </IonItem>
              );
            })}
          </IonList>
        ) : (
          <IonList>
            <IonItem
              detail
              onClick={() => {
                history.push({ search: `?department=none` });
              }}
            >
              <IonLabel>{currentOrg?.detail.name}</IonLabel>
            </IonItem>
            {loading
              ? null
              : departments?.map((dp) => {
                  return (
                    <IonItem
                      detail
                      onClick={() => {
                        history.push({ search: `?department=${dp.id}` });
                      }}
                    >
                      <IonLabel>{dp.name}</IonLabel>
                    </IonItem>
                  );
                })}
          </IonList>
        )}
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
        <IonToolbar>
          <IonButtons slot="start">
            <IonBackButton />
          </IonButtons>
          <IonTitle>{info?.departmentName ?? "无部门成员"}</IonTitle>
        </IonToolbar>
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
