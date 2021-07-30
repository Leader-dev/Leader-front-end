import { useOrgDetails } from "@/services/org/detail";
import { createOrgDepartment } from "@/services/org/manage/structure/createDepartment";
import { dismissOrgMember } from "@/services/org/manage/structure/dismiss";
import { useDepartmentList } from "@/services/org/manage/structure/listDepartments";
import { useOrgMemberList } from "@/services/org/manage/structure/listMembers";
import { useOrgMemberInfo } from "@/services/org/manage/structure/memberInfo";
import { editDepartmentName } from "@/services/org/manage/structure/renameDepartment";
import { useToast } from "@/utils/toast";
import {
  IonAvatar,
  IonBackButton,
  IonButton,
  IonButtons,
  IonContent,
  IonHeader,
  IonIcon,
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
  IonRouterOutlet,
  IonSearchbar,
  IonTitle,
  IonToolbar,
  useIonAlert,
  useIonModal,
  useIonRouter,
} from "@ionic/react";
import { add } from "ionicons/icons";
import { string } from "joi";
import { useEffect, useState } from "react";
import {
  Route,
  Switch,
  useHistory,
  useLocation,
  useParams,
} from "react-router";

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

const EditDepartment = ({
  name,
  memberCount,
  previous,
  child,
  onClose,
  onSubmit,
}: {
  onClose?: () => void;
  onSubmit: (data: { name: string }) => void;
  name: string;
  memberCount: number;
  previous: string;
  child: string[];
}) => {
  const [n, setN] = useState(name);
  useEffect(() => {
    setN(name);
  }, [name]);
  return (
    <>
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            <IonButton
              onClick={() => {
                if (onClose) onClose();
              }}
            >
              取消
            </IonButton>
          </IonButtons>
          <IonTitle>{name}</IonTitle>
          <IonButtons slot="end">
            <IonButton>
              <IonButton
                onClick={() => {
                  onSubmit({ name: n });
                }}
              >
                确定
              </IonButton>
            </IonButton>
          </IonButtons>
        </IonToolbar>
      </IonHeader>
      <IonContent>
        <IonItem>
          <IonLabel>部门名称</IonLabel>
          <IonInput
            value={n}
            onIonChange={(e) => {
              setN(e.detail.value!);
            }}
          />
        </IonItem>
      </IonContent>
    </>
  );
};

const ManageMemberPage = () => {
  console.log("DUH");
  const router = useIonRouter();
  const { orgId } = useParams<{ orgId: string }>();
  console.log({ orgId });
  const [crumb, setCrumb] = useState<
    (undefined | { name: string; id: string })[]
  >([undefined]);
  const departmentId = crumb[crumb.length - 1]?.id;
  const departmentName = crumb[crumb.length - 1]?.name ?? "组织架构";
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

  const [presentNewModal, dismissNewModal] = useIonModal(NewDepartment, {
    onSubmit: ({ name }: { name: string }) => {
      createOrgDepartment({
        orgId,
        name,
        parentId: departmentId ?? null,
      }).then(() => mutateDepartmentList());
      dismissNewModal();
    },
    onCancel: () => {
      dismissNewModal();
    },
  });
  const [presentEditModal, dismissEditModal] = useIonModal(EditDepartment, {
    onSubmit: ({ name }: { name: string }) => {
      if (departmentId) {
        editDepartmentName({
          orgId,
          departmentId,
          name,
        });
      }
      dismissEditModal();
    },
    onClose: () => {
      dismissEditModal();
    },
    name: !departmentId ? "" : departmentName,
    memberCount: memberList?.length,
    previous: crumb[crumb.length - 2],
    child: departments,
  });
  console.log({
    memberList,
  });
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            <IonBackButton />
          </IonButtons>
          <IonTitle>{departmentName}</IonTitle>
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
          {memberList
            ?.filter((member) => member.roleName === "member")
            .map((member) => {
              return (
                <IonItemSliding key={member.id}>
                  <IonItem
                    detail
                    routerLink={`/org/${orgId}/manage-members/${member.id}`}
                  >
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

          <IonListHeader>
            <IonLabel>{departmentId ? "管理员" : "直隶管理员"}</IonLabel>
            <IonButton fill="solid">
              <IonIcon icon={add} />
            </IonButton>
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
                <IonItemSliding key={member.id}>
                  <IonItem
                    detail
                    routerLink={`/org/${orgId}/manage-members/${member.id}`}
                  >
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
            onClick={() => presentNewModal()}
            disabled={crumb.length >= 3}
          >
            添加子部门
          </IonButton>
          <IonButton
            style={{ width: "50%", flexGrow: 1 }}
            onClick={() => presentEditModal()}
            disabled={!departmentId}
          >
            部门管理
          </IonButton>
        </div>
      </IonContent>
    </IonPage>
  );
};

const MemberDetailPage = () => {
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
      <IonContent>
        <div style={{ textAlign: "center", margin: "32px 0" }}>
          <div style={{ fontSize: "24px", marginBottom: "8px" }}>
            {info?.name}
          </div>
          <div>{info?.numberId}</div>
        </div>
      </IonContent>
    </IonPage>
  );
};

export default () => (
  <Switch>
    <Route
      path="/org/:orgId/manage-members/:memberId"
      component={MemberDetailPage}
    />
    <Route path="/org/:orgId/manage-members" component={ManageMemberPage} />
  </Switch>
);
