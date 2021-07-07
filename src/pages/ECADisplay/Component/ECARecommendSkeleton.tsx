import * as React from "react";
import {
  IonCard,
  IonIcon,
  IonImg,
  IonCardContent,
  IonSlide,
  IonText,
  IonButton,
  IonSlides,
} from "@ionic/react";
import ECAInfoCardSkeleton from "./ECAInfoCardSkeleton";

export default ({ tabBarHeight }: { tabBarHeight: number }) => {
  return (
    <div
      style={{
        borderTopLeftRadius: "25px",
        borderTopRightRadius: "25px",
        boxShadow: "0 -4px 6px -1px lightgrey",
        position: "absolute",
        bottom: tabBarHeight,
        left: 0,
        right: 0,
        height: "51vh",
      }}
    >
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          height: "6vh",
          padding: "1.5vh 1.5vw 1vh 4.5vw",
        }}
      >
        <IonText
          style={{
            fontSize: "24px",
            fontWeight: "bolder",
          }}
        >
          推荐
        </IonText>
        <IonButton fill="clear" size="small">
          查看更多
        </IonButton>
      </div>
      <IonSlides
        className="bottom-slider"
        pager={true}
        options={{
          initialSlide: 1,
        }}
        style={{
          overflow: "visible",
        }}
      >
        <IonSlide>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "45vw 45vw",
              gridTemplateRows: "20vh 20vh",
              gridColumnGap: "2vw",
              gridRowGap: "1.5vh",
            }}
          >
            <div
              style={{
                gridColumn: 1,
                gridRow: "1 / 3",
              }}
            >
              <ECAInfoCardSkeleton />
            </div>
            <div
              style={{
                gridColumn: 2,
                gridRow: 1,
              }}
            >
              <ECAInfoCardSkeleton />
            </div>
            <div
              style={{
                gridColumn: 2,
                gridRow: 2,
              }}
            >
              <ECAInfoCardSkeleton />
            </div>
          </div>
        </IonSlide>
      </IonSlides>
    </div>
  );
};
