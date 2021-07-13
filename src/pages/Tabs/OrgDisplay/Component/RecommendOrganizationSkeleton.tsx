import * as React from "react";
import { IonSlide, IonSlides, IonSkeletonText } from "@ionic/react";
import OrganizationInfoCardSkeleton from "./OrganizationInfoCardSkeleton";

export default ({ tabBarHeight }: { tabBarHeight: string }) => {
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
          padding: "1.5vh 4.5vw",
        }}
      >
        <IonSkeletonText animated style={{ width: "20%", height: "80%" }} />
        <IonSkeletonText animated style={{ width: "20%", height: "80%" }} />
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
              <OrganizationInfoCardSkeleton size="large" />
            </div>
            <div
              style={{
                gridColumn: 2,
                gridRow: 1,
              }}
            >
              <OrganizationInfoCardSkeleton size="small" />
            </div>
            <div
              style={{
                gridColumn: 2,
                gridRow: 2,
              }}
            >
              <OrganizationInfoCardSkeleton size="small" />
            </div>
          </div>
        </IonSlide>
      </IonSlides>
    </div>
  );
};
