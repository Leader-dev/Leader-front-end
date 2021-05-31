import * as React from "react";
import {
  IonCard,
  IonIcon,
  IonImg,
  IonCardContent,
  IonCardHeader,
} from "@ionic/react";
import { personSharp } from "ionicons/icons";

export interface ECAInfo {
  name: string;
  id: number;
  posterUrl: string;
  memberNum: number;
  address: string;
}

export default ({ info, size }: { info: ECAInfo; size: string }) => {
  console.log(info);
  const { name, id, posterUrl, memberNum, address } = info;
  let cardHeight, posterProportion;
  if (size === "large") {
    posterProportion = 85;
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
      <IonCardHeader
        style={{
          height: posterProportion + "%",
          padding: 0,
          overflow: "hidden",
        }}
      >
        <IonImg src={posterUrl} />
      </IonCardHeader>

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
          {id}
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
          {memberNum}
          <span
            style={{
              marginLeft: "2px",
            }}
          >
            {address}
          </span>
        </div>
      </IonCardContent>
    </IonCard>
  );
};
