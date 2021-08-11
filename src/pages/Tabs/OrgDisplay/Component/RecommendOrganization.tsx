import * as React from "react";
import { IonSlide, IonText, IonButton, IonSlides, IonIcon } from "@ionic/react";
import OrganizationInfoCard from "./OrganizationInfoCard";
import { OrgInfo } from "@/types/organization";
import { refresh } from "ionicons/icons";

export default ({ info }: { info: OrgInfo[] }) => {
  let orgList = [];
  let pageNum = Math.floor(info.length / 3);
  for (let i = 0; i < pageNum; i++) {
    orgList.push(
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
            <OrganizationInfoCard info={info[3 * i]} size="large" />
          </div>
          <div
            style={{
              gridColumn: 2,
              gridRow: 1,
            }}
          >
            <OrganizationInfoCard info={info[3 * i + 1]} size="small" />
          </div>
          <div
            style={{
              gridColumn: 2,
              gridRow: 2,
            }}
          >
            <OrganizationInfoCard info={info[3 * i + 2]} size="small" />
          </div>
        </div>
      </IonSlide>
    );
  }

  return (
    <div
      slot="fixed"
      style={{
        borderTopLeftRadius: "25px",
        borderTopRightRadius: "25px",
        boxShadow: "0 -4px 6px -1px lightgrey",
        bottom: 0,
        left: 0,
        right: 0,
        height: "51vh",
      }}
    >
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          height: "6vh",
          padding: "1.5vh 1.5vw 1vh 4.5vw",
        }}
      >
        <IonText
          style={{
            fontSize: "22px",
            fontWeight: "bolder",
          }}
        >
          推荐
        </IonText>
        <IonButton fill="clear" size="small">
          <IonIcon icon={refresh} />
          下一批
        </IonButton>
      </div>
      <IonSlides
        className="bottom-slider"
        pager={true}
        options={{
          initialSlide: 0,
        }}
        style={{
          overflow: "visible",
        }}
      >
        {orgList}
      </IonSlides>
    </div>
  );
};
