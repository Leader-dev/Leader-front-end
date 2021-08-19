import * as React from "react";
import {
  IonCol,
  IonGrid,
  IonButton,
  IonRow,
  IonIcon,
  useIonPopover,
  IonPopover,
} from "@ionic/react";
import { OrgDetailsResult } from "@/types/organization";
import {
  checkmarkCircle,
  helpCircle,
  peopleSharp,
  qrCodeOutline,
} from "ionicons/icons";
import { useHostName } from "@/services/app/hostname";
import "./info.css";
import { useState } from "react";

export default ({ info }: { info: OrgDetailsResult }) => {
  const { detail, applicationStatus } = info;
  const { data: hostName } = useHostName();

  let applicationBtn;
  if (applicationStatus === "closed") {
    applicationBtn = (
      <IonButton
        style={{ height: "30px" }}
        color="dark"
        size="small"
        disabled={true}
      >
        招新关闭
      </IonButton>
    );
  } else if (applicationStatus === "available") {
    applicationBtn = (
      <IonButton
        style={{ height: "30px" }}
        color="primary"
        size="small"
        routerLink={"apply"}
      >
        申请加入
      </IonButton>
    );
  } else if (applicationStatus === "joined") {
    applicationBtn = (
      <IonButton
        style={{ height: "30px" }}
        color="success"
        size="small"
        disabled={true}
      >
        已加入
      </IonButton>
    );
  } else if (applicationStatus === "applied") {
    applicationBtn = (
      <IonButton
        style={{ height: "30px" }}
        color="medium"
        size="small"
        disabled={true}
      >
        已申请
      </IonButton>
    );
  } else {
    applicationBtn = "error";
  }

  let authIcon, authColor;
  if (detail.instituteAuth === "official") {
    authIcon = (
      <IonIcon icon={checkmarkCircle} style={{ marginRight: "2px" }} />
    );
    authColor = "var(--ion-color-primary)";
  } else {
    authIcon = <IonIcon icon={helpCircle} style={{ marginRight: "2px" }} />;
    authColor = "var(--ion-color-warning)";
  }

  const QRCode = require("qrcode.react");
  const qrCodeComponent = (
    <div style={{ padding: "20px" }}>
      <QRCode value={`${hostName}/org/${detail.id}/detail`} />
    </div>
  );

  const [popoverState, setShowPopover] = useState({
    showPopover: false,
    event: undefined,
  });

  return (
    <>
      <IonPopover
        cssClass="my-custom-class"
        event={popoverState.event}
        isOpen={popoverState.showPopover}
        onDidDismiss={() =>
          setShowPopover({ showPopover: false, event: undefined })
        }
      >
        <div style={{ padding: "20px" }}>
          <QRCode value={`${hostName}/org/${detail.id}/detail`} />
        </div>
      </IonPopover>
      <IonGrid>
        <IonRow>
          <IonCol style={{ fontSize: "90%", lineHeight: "150%" }}>
            <div
              style={{
                fontSize: "120%",
                fontWeight: "bold",
                lineHeight: "160%",
              }}
            >
              {detail.name}
            </div>
            <div
              style={{
                fontSize: "100%",
                color: "var(--ion-color-medium)",
                lineHeight: "140%",
              }}
            >
              {detail.numberId}
            </div>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                color: authColor,
              }}
            >
              {authIcon}
              {detail.instituteName}
            </div>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                color: "var(--ion-color-primary)",
              }}
            >
              <IonIcon icon={peopleSharp} style={{ marginRight: "2px" }} />
              成员数 {detail.memberCount}
            </div>
          </IonCol>
          <IonCol
            size="5"
            className="ion-align-items-center"
            style={{ textAlign: "right", display: "flex" }}
          >
            <IonButton
              fill={"clear"}
              style={{ "--padding-end": "6px" }}
              onClick={(e: any) => {
                e.persist();
                setShowPopover({ showPopover: true, event: e });
              }}
            >
              <IonIcon slot={"icon-only"} icon={qrCodeOutline} />
            </IonButton>
            {applicationBtn}
          </IonCol>
        </IonRow>
        <IonRow
          style={{
            marginTop: "5px",
            marginBottom: "2px",
            fontSize: "120%",
            fontWeight: "bold",
            color: "#4E6B84",
            lineHeight: "160%",
          }}
        >
          简介：
        </IonRow>
        <IonRow style={{ fontSize: "95%", lineHeight: "125%" }}>
          {detail.introduction}
        </IonRow>
      </IonGrid>
    </>
  );
};
