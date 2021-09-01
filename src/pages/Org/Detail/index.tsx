import * as React from "react";
import {
  IonButtons,
  IonLabel,
  IonPage,
  IonToolbar,
  IonHeader,
  IonContent,
  IonButton,
  IonIcon,
  IonSegment,
  IonSegmentButton,
  useIonRouter,
} from "@ionic/react";
import "./index.css";
import {
  chevronBack,
  heart,
  heartOutline,
  warningOutline,
} from "ionicons/icons";
import { useEffect, useState } from "react";
import { useParams } from "react-router";
import { useOrgDetails } from "@/services/org/detail";
import OrgDetailInfo from "./components/Info";
import OrgDetailContact from "./components/Contact";
import InfoSkeleton from "./components/InfoSkeleton";
import {
  addOrgToFavorite,
  removeOrgFromFavorite,
} from "@/services/org/favorite";
import { useStartUrl } from "@/services/service/image/accessStartUrl";
import { useHostName } from "@/services/app/hostname";

export default () => {
  const { orgId } = useParams<{ orgId: string }>();
  const { data: orgDetail, error: detailError } = useOrgDetails({ orgId });
  const { data: hostName, error: hostNameError } = useHostName();
  const [tab, setTab] = useState<"info" | "contact">("info");
  const [favorite, setFavorite] = useState<boolean>(false);

  useEffect(() => {
    if (orgDetail) {
      setFavorite(orgDetail.favorite);
    }
  }, [orgDetail]);

  let orgContent, backgroundUrl;
  if (detailError && hostNameError) {
    // Test data
    orgContent = <div>Error</div>;
  } else {
    if (!orgDetail || !hostName) {
      orgContent = <InfoSkeleton />;
    } else {
      orgContent =
        tab === "info" ? (
          <OrgDetailInfo info={orgDetail} hostName={hostName} />
        ) : (
          <OrgDetailContact info={orgDetail} />
        );
    }
  }

  const handleFavorite = () => {
    if (favorite) {
      console.log("removing");
      removeOrgFromFavorite(orgId).then(() => setFavorite(false));
    } else {
      console.log("adding");
      addOrgToFavorite(orgId).then(() => setFavorite(true));
    }
  };

  const { data: startUrl } = useStartUrl();
  const history = useIonRouter();

  return (
    <IonPage>
      <IonHeader style={{ height: "80vw" }}>
        <div style={{ color: "white", position: "relative", height: "100%" }}>
          <img
            src={`${startUrl}${
              orgDetail?.detail.posterUrl ||
              "v1_ipNqlAbA7NJpPjS8ay2KRiwKeoSuTz4h"
            }`}
            style={{
              top: 0,
              zIndex: -1,
              position: "absolute",
              width: "100vw",
              height: "80vw",
              objectFit: "cover",
            }}
          />
          <IonToolbar
            style={{ "--background": "none", "--border-style": "none" }}
          >
            <IonButtons slot="start">
              <IonButton
                shape={"round"}
                style={{
                  "--background": "rgba(173,173,173,0.19)",
                  "--color": "#FFFFFF",
                }}
                onClick={() => history.goBack()}
              >
                <IonIcon slot={"icon-only"} icon={chevronBack} />
              </IonButton>
            </IonButtons>
            <IonButtons slot="end">
              <IonButton
                shape="round"
                style={{
                  "--background": "rgba(173,173,173,0.19)",
                  "--color": "#FFFFFF",
                }}
                onClick={handleFavorite}
              >
                <IonIcon
                  slot="icon-only"
                  icon={favorite ? heart : heartOutline}
                />
              </IonButton>
              <IonButton
                shape="round"
                style={{
                  "--background": "rgba(173,173,173,0.19)",
                  "--color": "#FFFFFF",
                }}
              >
                <IonIcon slot="icon-only" icon={warningOutline} />
              </IonButton>
            </IonButtons>
          </IonToolbar>

          <IonToolbar
            className={"ion-no-padding"}
            style={{
              "--border-style": "none",
              "border-radius": "18px 18px 0 0",
              position: "absolute",
              bottom: "0",
            }}
          >
            <IonSegment
              mode="md"
              value={tab}
              onIonChange={(e) => {
                setTab(e.detail.value as "info" | "contact");
              }}
              style={{ "--background": "none" }}
            >
              <IonSegmentButton value="info">
                <IonLabel style={{ fontSize: "120%" }}> 详细信息 </IonLabel>
              </IonSegmentButton>
              <IonSegmentButton value="contact">
                <IonLabel style={{ fontSize: "120%" }}> 对外联络 </IonLabel>
              </IonSegmentButton>
            </IonSegment>
          </IonToolbar>
        </div>
      </IonHeader>

      <IonContent fullscreen>
        <div style={{ width: "100%", height: "100%", padding: "5px 20px" }}>
          {orgContent}
        </div>
      </IonContent>
    </IonPage>
  );
};
