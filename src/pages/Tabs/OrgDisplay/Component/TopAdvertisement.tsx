import * as React from "react";
import { IonSlides, IonSlide, IonImg } from "@ionic/react";
import { AdInfo } from "@/types/organization";
import { useHistory } from "react-router";
import { useStartUrl } from "@/services/service/image/accessStartUrl";

export default ({ info }: { info: AdInfo[] }) => {
  const history = useHistory();
  const { data: startUrl } = useStartUrl();
  let advertisementList = info.map((info) => (
    <IonSlide
      style={{
        borderRadius: "10px",
        overflow: "hidden",
      }}
      onClick={() => {
        history.push({
          pathname: `/org/${info.id}/detail`,
        });
      }}
    >
      <IonImg
        src={startUrl + info.posterUrl}
        style={{
          width: "100%",
          height: "100%",
          objectFit: "cover",
        }}
      />
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
        height: "24vh",
        width: "90vw",
      }}
    >
      {advertisementList}
    </IonSlides>
  );
};
