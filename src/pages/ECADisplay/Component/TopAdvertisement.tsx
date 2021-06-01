import * as React from "react";
import { IonSlide, IonImg } from "@ionic/react";
import { ECAInfo } from "./ECAInfoCard";

export interface AdvertisementInfo {
  id: number;
  posterUrl: string;
}

export default ({ info }: { info: AdvertisementInfo }) => {
  const { id, posterUrl } = info;
  return (
    <IonSlide
      style={{
        borderRadius: "10px",
        overflow: "hidden",
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
      {/*TODO Onclick function*/}
    </IonSlide>
  );
};
