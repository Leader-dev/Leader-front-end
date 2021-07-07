import * as React from "react";
import { IonCard, IonIcon, IonImg, IonCardContent } from "@ionic/react";
import { personSharp } from "ionicons/icons";

export interface ECAInfo {
  id: string;
  name: string;
  numberId: number;
  posterUrl: string;
  memberCount: number;
  instituteName: string;
}

export default ({ info, size }: { info: ECAInfo; size: string }) => {
  const { id, name, numberId, posterUrl, memberCount, instituteName } = info;
  let posterProportion;
  if (size === "large") {
    posterProportion = 86;
  } else {
    posterProportion = 70;
  }
  return (
    <IonCard
      style={{
        height: "100%",
        width: "100%",
        margin: 0,
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
