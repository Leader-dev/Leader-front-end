import {
  IonIcon,
  IonItem,
  IonItemOption,
  IonItemOptions,
  IonItemSliding,
  IonLabel,
  IonNote,
  IonText,
  useIonAlert,
} from "@ionic/react";
import { checkmarkCircle } from "ionicons/icons";
import * as React from "react";
import { OrgMember } from "@/types/organization";
import UserAvatar from "@/components/UserAvatar";
import { dismissOrgMember } from "@/services/org/manage/structure/dismiss";
import { useToast } from "@/utils/toast";

export const MemberCardWithSliding = ({
  memberInfo,
  routerLink,
  orgId,
}: {
  memberInfo: OrgMember;
  routerLink: string;
  orgId: string;
}) => {
  const [presentAlert] = useIonAlert();
  const [toast] = useToast();
  return (
    <IonItemSliding key={memberInfo.id}>
      <IonItem detail={true} routerLink={routerLink}>
        <UserAvatar src={memberInfo.avatarUrl!} />
        <IonLabel>
          <h2 style={{ lineHeight: "140%" }}>
            {memberInfo.name!}
            <IonText color={"primary"}>{memberInfo.title!}</IonText>
          </h2>
          <p style={{ fontSize: "70%" }}>
            <IonText color={"primary"}>成员号:</IonText>
            <span style={{ marginLeft: "2px" }}>{memberInfo.numberId!}</span>
          </p>
        </IonLabel>
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
              header: `确定要开除 ${memberInfo.name} 吗`,
              buttons: [
                {
                  text: "取消",
                },
                {
                  text: "确定",
                  handler: () => {
                    dismissOrgMember({
                      orgId,
                      memberId: memberInfo.id,
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
};

export default ({
  memberInfo,
  handleOnClick,
  selected,
  routerLink,
}: {
  memberInfo: OrgMember;
  handleOnClick?: () => void;
  selected?: boolean;
  routerLink?: string;
}) => {
  return (
    <IonItem
      detail={!!routerLink}
      key={memberInfo.id!}
      onClick={handleOnClick}
      routerLink={routerLink}
    >
      <UserAvatar src={memberInfo.avatarUrl!} />
      <IonLabel>
        <h2 style={{ lineHeight: "140%" }}>
          {memberInfo.name!}
          <IonText color={"primary"}>{memberInfo.title!}</IonText>
        </h2>
        <p style={{ fontSize: "70%" }}>
          <IonText color={"primary"}>成员号:</IonText>
          <span style={{ marginLeft: "2px" }}>{memberInfo.numberId!}</span>
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
