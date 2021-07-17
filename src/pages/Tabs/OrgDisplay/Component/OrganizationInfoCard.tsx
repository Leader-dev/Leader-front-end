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
    posterProportion = 86;
  } else {
    posterProportion = 70;
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
        console.log(id);
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
            fontSize: "10px",
            fontWeight: "bolder",
          }}
        >
          {name}
        </div>
        <div
          style={{
            color: "darkgray",
            fontSize: "10px",
          }}
        >
          {numberId}
        </div>

        <div
          style={{
            color: "cornflowerblue",
            fontSize: "8px",
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
