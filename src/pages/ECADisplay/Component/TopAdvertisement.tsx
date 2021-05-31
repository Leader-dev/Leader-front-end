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
    <IonSlide>
      <IonImg src={posterUrl} />
      {/*TODO Onclick function*/}
    </IonSlide>
  );
};
