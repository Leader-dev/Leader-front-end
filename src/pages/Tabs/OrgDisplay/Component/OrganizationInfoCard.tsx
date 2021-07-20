import * as React from "react";
import { IonCard, IonIcon, IonImg, IonCardContent } from "@ionic/react";
import { personSharp } from "ionicons/icons";
import { OrgInfo } from "@/types/organization";
import { useHistory } from "react-router";

export default ({ info, size }: { info: OrgInfo; size: string }) => {
  const {
    id,
    name,
    numberId,
    posterUrl,
    memberCount,
    instituteName,
    typeAliases,
  } = info;
  let posterProportion;
  if (size === "large") {
    posterProportion = 83;
  } else {
    posterProportion = 64;
  }

  const history = useHistory();

  return (
    <IonCard
      style={{
        height: "100%",
        width: "100%",
        margin: 0,
      }}
      onClick={() => {
        history.push({
          pathname: `/org/${id}/detail`,
        });
      }}
    >
      <div
        style={{
          height: posterProportion + "%",
        }}
      >
        <IonImg
          src={posterUrl}
          style={{
            width: "100%",
            height: "100%",
            objectFit: "cover",
          }}
        />
      </div>

      <IonCardContent
        style={{
          height: 1 - posterProportion + "%",
          textAlign: "left",
          padding: "5px 2vw",
        }}
      >
        <div
          style={{
            color: "black",
            fontSize: "75%",
            fontWeight: "bold",
          }}
        >
          {name}
        </div>
        <div
          style={{
            color: "var(--ion-color-medium)",
            fontSize: "70%",
          }}
        >
          {numberId}
        </div>

        <div
          style={{
            color: "cornflowerblue",
            fontSize: "60%",
            display: "flex",
            alignItems: "center",
          }}
        >
          <IonIcon
            icon={personSharp}
            style={{
              marginRight: "1px",
            }}
          />
          {memberCount}
          <span
            style={{
              marginLeft: "2px",
            }}
          >
            {instituteName}
          </span>
        </div>
      </IonCardContent>
    </IonCard>
  );
};
