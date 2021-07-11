import { useOrgDetails } from "@/services/org/detail";
import { useDepartmentList } from "@/services/org/manage/structure/listDepartments";
import { useOrgMemberList } from "@/services/org/manage/structure/listMembers";
import {
  IonAvatar,
  IonButton,
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
import { chevronBackOutline } from "ionicons/icons";
import { useLocation, useParams, useHistory } from "react-router";

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
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          {!departmentId || (
            <IonButton
              slot="start"
              fill="clear"
              color="light"
              onClick={() => {
                history.push({ search: "" });
              }}
            >
              <IonIcon icon={chevronBackOutline} />
            </IonButton>
          )}
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
                <IonItem key={member.id}>
                  {member.portraitUrl && (
                    <IonAvatar slot="start">
                      <img src={member.portraitUrl} />
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
              <IonLabel>{currentOrg?.name}</IonLabel>
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
export default MemberManagement;
