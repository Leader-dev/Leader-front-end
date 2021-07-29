import { useOrgDetails } from "@/services/org/detail";
import { createOrgDepartment } from "@/services/org/manage/structure/createDepartment";
import { dismissOrgMember } from "@/services/org/manage/structure/dismiss";
import { useDepartmentList } from "@/services/org/manage/structure/listDepartments";
import { useOrgMemberList } from "@/services/org/manage/structure/listMembers";
import { useToast } from "@/utils/toast";
import {
  IonAvatar,
  IonBackButton,
  IonButton,
  IonButtons,
  IonContent,
  IonHeader,
  IonImg,
  IonInput,
  IonItem,
  IonItemOption,
  IonItemOptions,
  IonItemSliding,
  IonLabel,
  IonList,
  IonListHeader,
  IonPage,
  IonSearchbar,
  IonTitle,
  IonToolbar,
  useIonAlert,
  useIonModal,
  useIonRouter,
} from "@ionic/react";
import { useState } from "react";
import { useHistory, useLocation, useParams } from "react-router";

function useQuery() {
  return new URLSearchParams(useLocation().search);
}

const Breadcrumb = ({
  path,
}: {
  path: { name: string; onClick?: () => void }[];
}) => {
  return (
    <>
      {path.map(({ name, onClick }, i) => (
        <>
          <span onClick={onClick}>{name}</span>
          {i !== path.length - 1 ? " > " : ""}
        </>
      ))}
    </>
  );
};

const NewDepartment = ({
  onSubmit,
  onCancel,
}: {
  onSubmit: (data: { name: string }) => void;
  onCancel: () => void;
}) => {
  const [name, setName] = useState("");
  return (
    <div>
      <IonItem>
        <IonLabel>
          <h1>添加子部门</h1>
        </IonLabel>
      </IonItem>
      <IonItem>
        <IonLabel>部门名称：</IonLabel>
        <IonInput
          placeholder="技术部"
          value={name}
          onIonChange={(e) => setName(e.detail.value!)}
        />
      </IonItem>
      <div>
        <div
          style={{
            position: "fixed",
            width: "100%",
            bottom: 0,
            display: "flex",
          }}
        >
          <IonButton
            style={{ width: "50%", flexGrow: 1 }}
            fill="clear"
            onClick={onCancel}
          >
            取消
          </IonButton>
          <IonButton
            style={{ width: "50%", flexGrow: 1 }}
            onClick={() => {
              onSubmit({ name });
            }}
          >
            添加
          </IonButton>
        </div>
      </div>
    </div>
  );
};

const useRefresh = () => {
  const k = useState(0)[1];
  return () => k((i) => i + 1);
};

const ManageMemberPage = () => {
  console.log("DUH");
  const router = useIonRouter();
  const refresh = useRefresh();
  const { orgId } = useParams<{ orgId: string }>();
  const [crumb, setCrumb] = useState<
    (undefined | { name: string; id: string })[]
  >([undefined]);
  const departmentId = crumb[crumb.length - 1]?.id;
  const [presentAlert] = useIonAlert();
  const [toast] = useToast();

  const { data: currentOrg } = useOrgDetails({ orgId });
  const { data: departments, mutate: mutateDepartmentList } = useDepartmentList(
    {
      orgId,
      parentId: departmentId,
    }
  );
  const { data: memberList } = useOrgMemberList({
    orgId,
    departmentId: departmentId,
  });

  const [present, dismiss] = useIonModal(NewDepartment, {
    onSubmit: ({ name }: { name: string }) => {
      createOrgDepartment({
        orgId,
        name,
        parentId: departmentId ?? null,
      }).then(() => mutateDepartmentList());
      dismiss();
    },
    onCancel: () => {
      dismiss();
    },
  });
  console.log({
    crumb,
  });
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            <IonBackButton />
          </IonButtons>
          <IonTitle>组织架构</IonTitle>
        </IonToolbar>
        <IonToolbar>
          <IonSearchbar />
        </IonToolbar>
      </IonHeader>
      <IonContent>
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
        <IonList>
          <IonListHeader>
            <IonLabel>子部门</IonLabel>
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
          })}

          <IonListHeader>
            <IonLabel>{departmentId ? "成员" : "无部门成员"}</IonLabel>
          </IonListHeader>
          {memberList?.map((member) => {
            return (
              <IonItemSliding>
                <IonItem detail key={member.id}>
                  {member.avatarUrl && (
                    <IonAvatar>
                      <IonImg src={member.avatarUrl} />
                    </IonAvatar>
                  )}
                  {member.name}
                  {member.title && `- ${member.roleName}`}
                </IonItem>
                <IonItemOptions side="end">
                  <IonItemOption
                    color="dark"
                    onClick={() => console.log("unread clicked")}
                  >
                    转移部门
                  </IonItemOption>
                  <IonItemOption
                    color="warning"
                    onClick={() => console.log("unread clicked")}
                  >
                    革职
                  </IonItemOption>
                  <IonItemOption
                    color="danger"
                    onClick={() => {
                      presentAlert({
                        header: `确定要开除 ${member.name} 吗`,
                        buttons: [
                          {
                            text: "取消",
                          },
                          {
                            text: "确定",
                            handler: () => {
                              dismissOrgMember({
                                orgId,
                                memberId: member.id,
                              }).then(() => {
                                toast({
                                  message: "移除成功",
                                  color: "success",
                                });
                              });
                            },
                          },
                        ],
                      });
                    }}
                  >
                    开除
                  </IonItemOption>
                </IonItemOptions>
              </IonItemSliding>
            );
          })}
        </IonList>

        <div
          style={{
            position: "fixed",
            width: "100%",
            bottom: 0,
            display: "flex",
          }}
        >
          <IonButton
            style={{ width: "50%", flexGrow: 1 }}
            onClick={() => present()}
            disabled={crumb.length >= 3}
          >
            添加子部门
          </IonButton>
          <IonButton style={{ width: "50%", flexGrow: 1 }}>部门管理</IonButton>
        </div>
      </IonContent>
    </IonPage>
  );
};

export default ManageMemberPage;
