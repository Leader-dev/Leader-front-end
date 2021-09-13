import * as React from "react";
import { useState } from "react";
import {
  IonBadge,
  IonButton,
  IonButtons,
  IonContent,
  IonHeader,
  IonIcon,
  IonItem,
  IonItemDivider,
  IonLabel,
  IonList,
  IonListHeader,
  IonPage,
  IonRow,
  IonSegment,
  IonSegmentButton,
  IonText,
  IonTitle,
  IonToolbar,
  useIonAlert,
  useIonModal,
  useIonRouter,
} from "@ionic/react";
import MemberCard from "./MemberCard";
import { useDepartmentList } from "@/services/org/manage/structure/listDepartments";
import { useOrgMemberList } from "@/services/org/manage/structure/listMembers";
import { OrgMember } from "@/types/organization";
import {
  addCircle,
  checkmarkCircle,
  chevronForward,
  ellipseOutline,
} from "ionicons/icons";
import { setDepartmentManagers } from "@/services/org/manage/structure/setDepartmentManagers";
import { setGeneralManagers } from "@/services/org/manage/structure/setGeneralManagers";
import { setMembers } from "@/services/org/manage/structure/setMembers";
import { dismissOrgMember } from "@/services/org/manage/structure/dismiss";
import { useToast } from "@/utils/toast";
import { useParams } from "react-router";
import { useOrgDetails } from "@/services/org/detail";

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

export const SelectedMembers = ({
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
      {selectedMembers.length ? (
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

export const ChangeDepartmentPage = () => {
  const { orgId } = useParams<{ orgId: string }>();
  const { memberId } = useParams<{ memberId: string }>();
  const [crumb, setCrumb] = useState<
    (undefined | { name: string; id: string })[]
  >([undefined]);
  const departmentId = crumb[crumb.length - 1]?.id;
  const { data: departments } = useDepartmentList({
    orgId,
    parentId: departmentId,
  });
  const { data: orgDetail } = useOrgDetails({ orgId });
  const [selectedDp, setSelectedDp] = useState<string>();
  const handleOnSelect = (dpId: string, selected: boolean) => {
    selected ? setSelectedDp(undefined) : setSelectedDp(dpId);
  };

  const history = useIonRouter();
  const [presentAlert] = useIonAlert();
  const [toast] = useToast();

  let content;
  if (departments && orgDetail) {
    content = (
      <>
        <Breadcrumb
          path={[
            {
              name: orgDetail.detail.name!,
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
            const checked = selectedDp === d.id;
            return (
              <IonItem key={d.id}>
                <IonIcon
                  color={checked ? "primary" : "medium"}
                  icon={checked ? checkmarkCircle : ellipseOutline}
                  onClick={() => handleOnSelect(d.id, checked)}
                  style={{ marginRight: "6px" }}
                />
                {d.name}
                <div
                  slot={"end"}
                  style={{ width: "40vw", textAlign: "end" }}
                  onClick={() => {
                    setCrumb((c) => [...c, d]);
                  }}
                >
                  <IonIcon color={"medium"} icon={chevronForward} />
                </div>
              </IonItem>
            );
          })
        ) : (
          <IonItem lines={"none"}>
            <IonLabel>无</IonLabel>
          </IonItem>
        )}
      </>
    );
  } else {
    content = <div> Skeleton </div>;
  }

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonButtons slot={"start"}>
            <IonButton onClick={() => history.goBack()}>取消</IonButton>
          </IonButtons>
          <IonTitle>选择部门</IonTitle>
          <IonButtons slot={"end"}>
            <IonButton
              onClick={() => {
                if (selectedDp) {
                  presentAlert({
                    message: "确定转移成员至此部门吗",
                    buttons: [
                      "取消",
                      {
                        text: "确认",
                        handler: () => {
                          setMembers({
                            orgId,
                            memberIds: [memberId],
                            departmentId: selectedDp,
                          }).then(() => {
                            history.goBack();
                            toast({
                              message: "转移成功",
                            });
                          });
                        },
                      },
                    ],
                  });
                } else {
                  history.goBack();
                }
              }}
            >
              确认
            </IonButton>
          </IonButtons>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>{content}</IonContent>
    </IonPage>
  );
};

interface selectedOpts {
  selectedMembers: OrgMember[];
  handleOnSelect: (memberInfo: OrgMember, selected: boolean) => void;
  currDepartmentId?: string;
}

interface SelectMemberProps {
  orgId: string;
  orgName: string;
  currDepartmentId?: string;
  onClose: () => void;
  onSubmit: (data: { memberIds: string[]; departmentId?: string }) => void;
}

const SelectMembersModal = ({
  orgId,
  orgName,
  currDepartmentId,
  onClose,
  onSubmit,
}: SelectMemberProps) => {
  const [selectedMembers, setSelectedMembers] = useState<OrgMember[]>([]);
  const handleOnSelect = (memberInfo: OrgMember, selected: boolean) => {
    selected
      ? setSelectedMembers(
          selectedMembers.filter((member) => member.id !== memberInfo.id)
        )
      : setSelectedMembers([...selectedMembers, memberInfo]);
  };

  const handleOnSubmit = () => {
    if (!selectedMembers.length) {
      onClose();
    } else {
      const memberIds = selectedMembers.map((member) => member.id);
      onSubmit({ memberIds: memberIds, departmentId: currDepartmentId });
    }
  };

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonButtons slot={"start"}>
            <IonButton onClick={onClose}>取消</IonButton>
          </IonButtons>
          <IonTitle>选择成员</IonTitle>
          <IonButtons slot={"end"}>
            <IonButton onClick={handleOnSubmit}>确认</IonButton>
          </IonButtons>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <IonList>
          <OrgStructure
            orgName={orgName}
            orgId={orgId}
            selectedOptions={{
              selectedMembers: selectedMembers,
              handleOnSelect: handleOnSelect,
              currDepartmentId: currDepartmentId,
            }}
          />
        </IonList>
      </IonContent>
    </IonPage>
  );
};

const HeaderWithAddButton = ({
  title,
  auth,
  onClick,
  count,
}: {
  title: string;
  auth: boolean;
  onClick: () => void;
  count: number;
}) => (
  <IonRow className="ion-align-items-end" style={{ marginBottom: "2px" }}>
    <IonListHeader style={{ width: "90vw" }}>
      <IonRow className={"ion-align-items-center"}>
        <h5 className={"ion-no-margin"}>{title}：</h5>
        <IonBadge>{count}</IonBadge>
        {auth ? (
          <IonText
            color={"medium"}
            style={{ fontSize: "60%", fontWeight: "normal", marginLeft: "3px" }}
          >
            右滑管理
          </IonText>
        ) : null}
      </IonRow>
    </IonListHeader>
    {auth ? (
      <IonIcon
        color={"primary"}
        style={{
          fontSize: "155%",
          marginBottom: "-1px",
        }}
        icon={addCircle}
        onClick={onClick}
      />
    ) : null}
  </IonRow>
);

const OrgStructure = ({
  orgName,
  orgId,
  selectedOptions,
  startRouterLink,
  manageAuth = false,
}: {
  orgName: string;
  orgId: string;
  selectedOptions?: selectedOpts;
  startRouterLink?: string;
  manageAuth?: boolean;
}) => {
  const [crumb, setCrumb] = useState<
    (undefined | { name: string; id: string })[]
  >([undefined]);
  const departmentId = crumb[crumb.length - 1]?.id;

  const { data: departments } = useDepartmentList({
    orgId,
    parentId: departmentId,
  });
  const { data: memberList } = useOrgMemberList({
    orgId,
    departmentId: departmentId,
  });
  const { data: currDpList } = useOrgMemberList({
    orgId,
    departmentId: selectedOptions?.currDepartmentId,
  });
  const [tab, setTab] = useState<"currDp" | "org">("currDp");
  const [presentAlert] = useIonAlert();
  const [toast] = useToast();
  const history = useIonRouter();

  const depose = (memberInfo: OrgMember, orgId: string) =>
    presentAlert({
      header: `确定要革职 ${memberInfo.name} 吗`,
      buttons: [
        "取消",
        {
          text: "确定",
          handler: () => {
            setMembers({
              orgId,
              memberIds: [memberInfo.id],
            }).then(() => {
              toast({
                message: "革职成功",
              });
            });
          },
        },
      ],
    });

  const dismiss = (memberInfo: OrgMember, orgId: string) =>
    presentAlert({
      header: `确定要开除 ${memberInfo.name} 吗`,
      buttons: [
        "取消",
        {
          text: "确定",
          handler: () => {
            dismissOrgMember({
              orgId,
              memberId: memberInfo.id,
            }).then(() => {
              toast({
                message: "移除成功",
              });
            });
          },
        },
      ],
    });

  const mapMembers = (members?: OrgMember[]) => {
    if (members?.length) {
      if (selectedOptions) {
        return members.map((member) => {
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
        });
      } else if (manageAuth) {
        return members.map((member) => (
          <MemberCard
            memberInfo={member}
            routerLink={startRouterLink + `/${member.id}`}
            itemOptions={[
              {
                title: "转移部门",
                color: "dark",
                onClick: () =>
                  history.push(`/org/${orgId}/transfer-member/${member.id}`),
              },
              {
                title: "革职",
                color: "warning",
                onClick: () => depose(member, orgId),
              },
              {
                title: "开除",
                color: "danger",
                onClick: () => dismiss(member, orgId),
              },
            ]}
          />
        ));
      } else {
        return members.map((member) => (
          <MemberCard
            memberInfo={member}
            routerLink={startRouterLink + `/${member.id}`}
          />
        ));
      }
    } else {
      return (
        <IonItem lines={"none"}>
          <IonLabel>无</IonLabel>
        </IonItem>
      );
    }
  };

  const [presentAddManagersModal, dismissAddManagersModal] = useIonModal(
    SelectMembersModal,
    {
      orgId: orgId,
      orgName: orgName,
      currDepartmentId: departmentId,
      onClose: () => {
        dismissAddManagersModal();
      },
      onSubmit: ({
        memberIds,
        departmentId,
      }: {
        memberIds: string[];
        departmentId: string;
      }) => {
        departmentId
          ? setDepartmentManagers({
              memberIds: memberIds,
              orgId: orgId,
              departmentId: departmentId,
            }).then(() => dismissAddManagersModal())
          : setGeneralManagers({ memberIds: memberIds, orgId: orgId }).then(
              () => dismissAddManagersModal()
            );
      },
    }
  );

  const [presentAddMembersModal, dismissAddMembersModal] = useIonModal(
    SelectMembersModal,
    {
      orgId: orgId,
      orgName: orgName,
      currDepartmentId: departmentId,
      onClose: () => {
        dismissAddMembersModal();
      },
      onSubmit: ({
        memberIds,
        departmentId,
      }: {
        memberIds: string[];
        departmentId: string;
      }) => {
        setMembers({
          memberIds: memberIds,
          orgId: orgId,
          departmentId: departmentId,
        }).then(() => dismissAddMembersModal());
      },
    }
  );

  let content;
  if (departments && memberList && currDpList) {
    const managers = memberList.filter((member) =>
      (!departmentId
        ? ["general-manager", "president"]
        : ["department-manager"]
      ).includes(member.roleName)
    );
    const members = memberList.filter((member) => member.roleName === "member");
    const completeStructure = (
      <>
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

        <HeaderWithAddButton
          title={departmentId ? "管理员" : "直隶管理员"}
          auth={manageAuth}
          onClick={() => presentAddManagersModal()}
          count={managers.length}
        />

        {mapMembers(managers)}

        <HeaderWithAddButton
          title={departmentId ? "成员" : "无部门成员"}
          auth={manageAuth}
          onClick={() => presentAddMembersModal()}
          count={members.length}
        />
        {mapMembers(members)}
      </>
    );
    content = (
      <IonList>
        {selectedOptions ? (
          <SelectedMembers
            selectedMembers={selectedOptions.selectedMembers}
            handleOnSelect={selectedOptions.handleOnSelect}
          />
        ) : null}
        {selectedOptions?.currDepartmentId ? (
          <>
            <div style={{ padding: "10px 10vw" }}>
              <IonSegment
                value={tab}
                onIonChange={(e) => {
                  setTab(e.detail.value as "currDp" | "org");
                }}
              >
                <IonSegmentButton value={"currDp"}>
                  从本部门选择
                </IonSegmentButton>
                <IonSegmentButton value={"org"}>
                  从所有成员选择
                </IonSegmentButton>
              </IonSegment>
            </div>
            {tab === "currDp" ? (
              <>
                {currDpList.length ? (
                  currDpList.map((member) => {
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
                  })
                ) : (
                  <IonItem lines={"none"}>
                    <IonLabel>无成员</IonLabel>
                  </IonItem>
                )}
              </>
            ) : (
              completeStructure
            )}
          </>
        ) : (
          completeStructure
        )}
      </IonList>
    );
  } else {
    content = <div> Skeleton </div>;
  }

  return content;
};

export default OrgStructure;
