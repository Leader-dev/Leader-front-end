import {
  IonAvatar,
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
  IonSegment,
  IonSegmentButton,
  IonText,
  IonToolbar,
  useIonRouter,
} from "@ionic/react";
import * as React from "react";
import { useParams } from "react-router";
import { useEffect, useState } from "react";
import { checkmarkCircle } from "ionicons/icons";
import { useOrgDetails } from "@/services/org/detail";
import { useDepartmentList } from "@/services/org/manage/structure/listDepartments";
import { useOrgMemberList } from "@/services/org/manage/structure/listMembers";
import { OrgMember } from "@/types/organization";
import BottomConfirm from "@/components/BottomConfirm";
import { useStartUrl } from "@/services/service/image/accessStartUrl";
import { useRecruitManagerInfo } from "@/services/org/manage/apply/setting/getRecruitManagerInfo";
import { setRecruitMangerInfo } from "@/services/org/manage/apply/setting/setRecruitMangerInfo";
import ToolbarWithBackButton from "@/components/ToolbarWithBackButton";

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

const MemberCard = ({
  memberInfo,
  handleOnSelect,
  selected,
}: {
  memberInfo: OrgMember;
  handleOnSelect: () => void;
  selected: boolean;
}) => {
  const { data: startUrl } = useStartUrl();

  return (
    <IonItem key={memberInfo?.id} onClick={handleOnSelect}>
      <IonAvatar slot={"start"}>
        <IonImg src={startUrl + memberInfo?.avatarUrl} />
      </IonAvatar>
      <IonLabel>
        <h2 style={{ lineHeight: "140%" }}>
          {memberInfo?.name}
          <IonText color={"primary"}>{memberInfo?.title}</IonText>
        </h2>
        <p style={{ fontSize: "70%" }}>
          <IonText color={"primary"}>成员号:</IonText>
          <span style={{ marginLeft: "2px" }}>{memberInfo?.numberId}</span>
        </p>
      </IonLabel>
      {selected ? (
        <IonNote slot={"end"}>
          <IonIcon
            style={{ fontSize: "130%" }}
            color={"primary"}
            icon={checkmarkCircle}
          />
        </IonNote>
      ) : null}
    </IonItem>
  );
};

export default () => {
  const [crumb, setCrumb] = useState<
    (undefined | { name: string; id: string })[]
  >([undefined]);
  const { orgId } = useParams<{ orgId: string }>();
  const { departmentId } = useParams<{ departmentId: string }>();
  const childDpId = crumb[crumb.length - 1]?.id;

  const [selectedMembers, setSelectedMembers] = useState<OrgMember[]>([]);
  const { data: departmentManager } = useRecruitManagerInfo({
    orgId: orgId,
    departmentId: departmentId,
  });
  useEffect(() => {
    if (departmentManager) {
      setSelectedMembers([departmentManager.memberInfo]);
    }
  }, [departmentManager]);

  const { data: departments } = useDepartmentList({
    orgId,
    parentId: childDpId,
  });
  const { data: memberList } = useOrgMemberList({
    orgId,
    departmentId: childDpId,
  });
  const { data: currDpList } = useOrgMemberList({
    orgId,
    departmentId: departmentId,
  });

  const { data: currentOrg } = useOrgDetails({ orgId });

  const [tab, setTab] = useState<"currDp" | "org">("currDp");

  const history = useIonRouter();

  const onSubmit = () => {
    setRecruitMangerInfo({
      orgId: orgId,
      departmentId: departmentId,
      memberId: selectedMembers[0].id,
    }).then(() => history.goBack());
  };

  const handleOnSelect = (memberInfo: OrgMember, selected: boolean) => {
    selected ? setSelectedMembers([]) : setSelectedMembers([memberInfo]);
  };

  let content;
  if (
    departments &&
    memberList &&
    currentOrg &&
    departmentManager &&
    currDpList
  ) {
    content = (
      <>
        <IonList>
          <IonListHeader>
            <h5>已选中成员：</h5>
          </IonListHeader>
          {selectedMembers[0] ? (
            selectedMembers.map((member) => (
              <MemberCard
                memberInfo={member}
                selected={true}
                handleOnSelect={() => handleOnSelect(member, true)}
              />
            ))
          ) : (
            <IonItem lines={"none"}>
              <IonLabel>无</IonLabel>
            </IonItem>
          )}
          <div style={{ height: "15px" }} />

          <IonItemDivider />
          <div style={{ padding: "10px 10vw" }}>
            <IonSegment
              value={tab}
              onIonChange={(e) => {
                setTab(e.detail.value as "currDp" | "org");
              }}
              // style={{ width: "50%"}}
              // className={"ion-justify-content-center"}
            >
              <IonSegmentButton value={"currDp"}>从本部门选择</IonSegmentButton>
              <IonSegmentButton value={"poster"}>
                从所有成员选择
              </IonSegmentButton>
            </IonSegment>
          </div>

          {tab === "currDp" ? (
            <>
              {currDpList.length ? (
                currDpList.map((member) => {
                  const selected = selectedMembers.some(
                    (selectedMember) => selectedMember.id === member.id
                  );
                  return (
                    <MemberCard
                      memberInfo={member}
                      handleOnSelect={() => handleOnSelect(member, selected)}
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
            <>
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
              {memberList.filter((member) =>
                (!childDpId
                  ? ["general-manager", "president"]
                  : ["department-manager"]
                ).includes(member.roleName)
              ).length ? (
                memberList
                  .filter((member) =>
                    (!childDpId
                      ? ["general-manager", "president"]
                      : ["department-manager"]
                    ).includes(member.roleName)
                  )
                  .map((member) => {
                    const selected = selectedMembers.some(
                      (selectedMember) => selectedMember.id === member.id
                    );
                    return (
                      <MemberCard
                        memberInfo={member}
                        handleOnSelect={() => handleOnSelect(member, selected)}
                        selected={selected}
                      />
                    );
                  })
              ) : (
                <IonItem lines={"none"}>
                  <IonLabel>无</IonLabel>
                </IonItem>
              )}

              <IonListHeader>
                <h5>{childDpId ? "成员" : "无部门成员"}：</h5>
              </IonListHeader>
              {memberList.filter((member) => member.roleName === "member")
                .length ? (
                memberList
                  .filter((member) => member.roleName === "member")
                  .map((member) => {
                    const selected = selectedMembers.some(
                      (selectedMember) => selectedMember.id === member.id
                    );
                    return (
                      <MemberCard
                        memberInfo={member}
                        handleOnSelect={() => handleOnSelect(member, selected)}
                        selected={selected}
                      />
                    );
                  })
              ) : (
                <IonItem lines={"none"}>
                  <IonLabel>无</IonLabel>
                </IonItem>
              )}
            </>
          )}
        </IonList>
        <BottomConfirm title={"确认添加"} submit={false} onClick={onSubmit} />
      </>
    );
  } else {
    content = <div>Skeleton</div>;
  }

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <ToolbarWithBackButton title={"选择招新审核员"} border={false} />
        </IonToolbar>
        <IonToolbar>
          <IonSearchbar />
        </IonToolbar>
      </IonHeader>

      <IonContent fullscreen>{content}</IonContent>
    </IonPage>
  );
};
