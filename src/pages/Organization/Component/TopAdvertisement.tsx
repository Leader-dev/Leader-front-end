import * as React from "react";
import { IonSlides, IonSlide, IonImg } from "@ionic/react";

export interface AdvertisementInfo {
  id: string;
  posterUrl: string;
}

export default ({ info }: { info: AdvertisementInfo[] }) => {
  let advertisementList = info.map((info) => (
    <IonSlide
      style={{
        borderRadius: "10px",
        overflow: "hidden",
      }}
    >
      <IonImg
        src={info.posterUrl}
        style={{
          width: "100%",
          height: "100%",
          objectFit: "cover",
        }}
      />
      {/*TODO Onclick function*/}
    </IonSlide>
  ));
  return (
    <IonSlides
      className="top-slider"
      pager={true}
      options={{
        initialSlide: 1,
        speed: 400,
      }}
      style={{
        height: "23vh",
        width: "92vw",
      }}
    >
      {advertisementList}
    </IonSlides>
  );
};
