import * as React from "react";
import { IonSlides, IonSlide, IonImg } from "@ionic/react";

export interface AdvertisementInfo {
  id: number;
  posterUrl: string;
}

export default ({ info }: { info: AdvertisementInfo }) => {
  const { id, posterUrl } = info;
  return (
    <IonSlides>
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
    </IonSlides>
  );
};
