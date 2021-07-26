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

export default () => {
  const { orgId } = useParams<{ orgId: string }>();
  const { data: orgDetail, error: detailError } = useOrgDetails({ orgId });
  const [tab, setTab] = useState<"info" | "contact">("info");
  const [favorite, setFavorite] = useState<boolean>(false);

  useEffect(() => {
    if (orgDetail) {
      setFavorite(orgDetail.favorite);
    }
  }, [orgDetail]);

  let orgContent, backgroundUrl;
  if (detailError) return <div> Failed to load</div>;
  if (!orgDetail) {
    orgContent = <InfoSkeleton />;
    backgroundUrl = "";
  } else {
    orgContent =
      tab === "info" ? (
        <OrgDetailInfo info={orgDetail} />
      ) : (
        <OrgDetailContact info={orgDetail} />
      );
    backgroundUrl = orgDetail.detail.posterUrl;
  }

  const handleFavorite = () => {
    if (favorite) {
      console.log("removing");
      removeOrgFromFavorite(orgId).then((r) => setFavorite(false));
    } else {
      console.log("adding");
      addOrgToFavorite(orgId).then((r) => setFavorite(true));
    }
  };

  return (
    <IonPage>
      <IonHeader
        style={{
          backgroundImage: 'url("' + backgroundUrl + '")',
          height: "80vw",
        }}
      >
        <div
          style={{
            height: "100%",
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
          }}
        >
          <IonToolbar className="transparent-toolbar">
            <IonButtons slot="start">
              <IonButton
                shape="round"
                style={{
                  "--background": "rgba(173,173,173,0.19)",
                  "--color": "#FFFFFF",
                }}
                routerLink={"/tabs/org-display"}
              >
                <IonIcon slot="icon-only" icon={chevronBack} />
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
                {favorite ? (
                  <IonIcon slot="icon-only" icon={heart} />
                ) : (
                  <IonIcon slot="icon-only" icon={heartOutline} />
                )}
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

          <IonToolbar className="rounded-toolbar">
            <IonSegment
              mode="md"
              value={tab}
              onIonChange={(e) => {
                setTab(e.detail.value as "info" | "contact");
              }}
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
