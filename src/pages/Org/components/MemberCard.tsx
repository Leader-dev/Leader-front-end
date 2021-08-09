import {
  IonAvatar,
  IonIcon,
  IonImg,
  IonItem,
  IonLabel,
  IonNote,
  IonText,
} from "@ionic/react";
import { checkmarkCircle, chevronBack, chevronForward } from "ionicons/icons";
import * as React from "react";
import { OrgMember } from "@/types/organization";
import { useStartUrl } from "@/services/service/image/accessStartUrl";

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
  const { data: startUrl } = useStartUrl();
  return (
    <IonItem
      detail={!!routerLink}
      key={memberInfo?.id}
      onClick={handleOnClick}
      routerLink={routerLink}
    >
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
