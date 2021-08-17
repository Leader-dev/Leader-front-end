import { useOrgDetails } from "@/services/org/detail";
import { createOrgDepartment } from "@/services/org/manage/structure/createDepartment";
import { deleteOrgDepartment } from "@/services/org/manage/structure/deleteDepartment";
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
  IonItemDivider,
  IonItemOption,
  IonItemOptions,
  IonItemSliding,
  IonLabel,
  IonList,
  IonListHeader,
  IonPage,
  IonRow,
  IonSearchbar,
  IonTitle,
  IonToolbar,
  useIonAlert,
  useIonModal,
  useIonRouter,
} from "@ionic/react";
import { add, addCircle } from "ionicons/icons";
import { string } from "joi";
import { useEffect, useState } from "react";
import { Route, Switch, useParams } from "react-router";
import * as React from "react";
import ToolbarWithBackButton from "@/components/ToolbarWithBackButton";
import { Breadcrumb } from "@/pages/Org/components/OrgStructure";
import BottomDoubleButtons from "@/components/BottomDoubleButtons";
import BottomButton from "@/components/BottomButton";
import { MemberCardWithSliding } from "../components/MemberCard";

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
      <IonHeader>
        <IonToolbar>
          <IonTitle>添加子部门</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonItem>
        <IonLabel>部门名称：</IonLabel>
        <IonInput
          placeholder="技术部"
          value={name}
          onIonChange={(e) => setName(e.detail.value!)}
        />
      </IonItem>
      <BottomDoubleButtons
        left={{
          title: "取消",
          onClick: onCancel,
          fill: "outline",
        }}
        right={{
          title: "添加",
          onClick: () => onSubmit({ name }),
          fill: "solid",
        }}
      />
    </div>
  );
};

const EditDepartment = ({
  name,
  members,
  previous,
  child,
  onClose,
  onSubmit,
  onDelete,
}: {
  onClose?: () => void;
  onSubmit: (data: { name: string }) => void;
  onDelete: () => void;
  name: string;
  members: Array<any>;
  previous: string | null;
  child: string[];
}) => {
  const [n, setN] = useState(name);
  const [presentAlert] = useIonAlert();
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
        <IonListHeader>
          <IonLabel>基本信息</IonLabel>
        </IonListHeader>
        <IonItem>
          <IonLabel position={"stacked"}>
            <h2>部门名称</h2>
          </IonLabel>
          <IonInput
            value={n}
            onIonChange={(e) => {
              setN(e.detail.value!);
            }}
          />
        </IonItem>
        <IonItem>
          <IonLabel>
            <h2>部门总人数</h2>
            <p>{members.length}</p>
          </IonLabel>
        </IonItem>
        <IonItem>
          <IonLabel>
            <h2>部门管理员数</h2>
            <p>
              {
                members.filter(
                  (member) => member.roleName === "department-manager"
                ).length
              }
            </p>
          </IonLabel>
        </IonItem>
        <IonItem>
          <IonLabel>
            <h2>上级部门</h2>
            <p>{previous ?? "无"}</p>
          </IonLabel>
        </IonItem>
        <IonListHeader>
          <h5>子部门</h5>
        </IonListHeader>
        {child.length ? (
          child.map((i) => <IonItem key={i}>{i}</IonItem>)
        ) : (
          <IonItem>无</IonItem>
        )}
        {previous ? (
          <BottomButton
            content={"注销部门"}
            color={"danger"}
            onClick={() => {
              presentAlert({
                header: `注销部门`,
                message: `确定要注销${name}吗？`,
                buttons: [
                  "取消",
                  {
                    text: "确定",
                    handler: () => {
                      onDelete();
                    },
                  },
                ],
              });
            }}
          />
        ) : null}
      </IonContent>
    </>
  );
};

// TODO Add manager
const AddManager = ({}: { onSubmit: string; onClose: () => void }) => {
  return;
};

const ManageMemberPage = () => {
  console.log("DUH");
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
        }).then(() => {
          setCrumb((c) => c.slice(0, c.length - 1));
          mutateDepartmentList();
        });
      }
      dismissEditModal();
    },
    onClose: () => {
      dismissEditModal();
    },
    onDelete: () => {
      if (departmentId)
        deleteOrgDepartment({ orgId, departmentId }).then(() => {
          mutateDepartmentList();
          setCrumb((c) => c.slice(0, c.length - 1));
          toast({ message: "部门已删除", color: "success" });
          dismissEditModal();
        });
    },
    name: !departmentId ? currentOrg?.detail.name : departmentName,
    members: memberList,
    previous:
      crumb.length > 1
        ? crumb[crumb.length - 2]?.name ?? currentOrg?.detail.name
        : null,
    child: departments?.map((d) => d.name),
  });
  console.log({
    crumb,
  });
  return (
    <IonPage>
      <IonHeader>
        <ToolbarWithBackButton title={departmentName} border={false} />
        <IonToolbar>
          <IonSearchbar />
        </IonToolbar>
      </IonHeader>
      <IonContent>
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
          {departments?.length ? (
            departments?.map((d) => {
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
            <h5>{departmentId ? "成员" : "无部门成员"}</h5>
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
            <IonRow className="ion-align-items-center">
              <IonLabel>{departmentId ? "管理员" : "直隶管理员"}</IonLabel>
              <IonIcon
                color={"primary"}
                style={{
                  fontSize: "120%",
                  marginRight: "15px",
                  marginLeft: "5px",
                }}
                icon={addCircle}
              />
            </IonRow>
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
                <MemberCardWithSliding
                  memberInfo={member}
                  routerLink={`/org/${orgId}/manage-members/${member.id}`}
                  itemOptions={
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
                  }
                />
              );
            })}
        </IonList>

        <BottomDoubleButtons
          left={{
            title: "添加子部门",
            onClick: () => presentNewModal(),
            disabled: crumb.length >= 3,
            fill: "solid",
          }}
          right={{
            title: "部门管理",
            onClick: () => presentEditModal(),
            fill: "solid",
          }}
        />
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

export default () => (
  <Switch>
    <Route
      path="/org/:orgId/manage-members/:memberId"
      component={MemberDetailPage}
    />
    <Route path="/org/:orgId/manage-members" component={ManageMemberPage} />
  </Switch>
);
