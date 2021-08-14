import { IonIcon, IonItem, IonLabel, IonNote, IonText } from "@ionic/react";
import { checkmarkCircle } from "ionicons/icons";
import * as React from "react";
import { OrgMember } from "@/types/organization";
import UserAvatar from "@/components/UserAvatar";

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
