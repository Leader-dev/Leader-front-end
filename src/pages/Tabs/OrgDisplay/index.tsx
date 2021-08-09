import * as React from "react";
import {
  IonContent,
  IonHeader,
  IonToolbar,
  IonPage,
  IonSearchbar,
  IonButtons,
  IonButton,
  IonIcon,
  IonRow,
  IonCol,
  useIonRouter,
} from "@ionic/react";
import "./index.css";
import { filterOutline, search } from "ionicons/icons";
import TopAdvertisement from "./Component/TopAdvertisement";
import TopAdvertisementSkeleton from "./Component/TopAdvertisementSkeleton";
import RecommendOrganization from "./Component/RecommendOrganization";
import RecommendOrganizationSkeleton from "./Component/RecommendOrganizationSkeleton";
import { useHomeOrg } from "@/services/org/home";

export default () => {
  // fetch data from back end
  const { data: homeInfo, error } = useHomeOrg();
  const history = useIonRouter();
  let adList, orgList;
  if (error) {
    // Test Data
    adList = <div>Error</div>;
    orgList = <div>Error</div>;
  } else {
    if (!homeInfo) {
      adList = <TopAdvertisementSkeleton />;
      orgList = <RecommendOrganizationSkeleton />;
    } else {
      adList = <TopAdvertisement info={homeInfo.pic} />;
      orgList = <RecommendOrganization info={homeInfo.list} />;
    }
  }

  return (
    <IonPage>
      <IonHeader className="ion-no-border">
        <IonToolbar className="blue-toolbar">
          <IonRow>
            <IonCol
              onClick={() => {
                history.push("/org/search");
              }}
              style={{
                marginLeft: "4vw",
                background: "white",
                borderRadius: 12,
                width: "100%",
                padding: 3,
              }}
            >
              <IonIcon
                color={"medium"}
                style={{ marginLeft: 4, marginBottom: -1, fontSize: "120%" }}
                icon={search}
              />
            </IonCol>
          </IonRow>
          <IonButtons style={{ marginRight: "2vw" }} slot={"end"}>
            <IonButton color="light">
              <IonIcon slot="icon-only" icon={filterOutline} />
            </IonButton>
          </IonButtons>
        </IonToolbar>
      </IonHeader>

      <IonContent fullscreen>
        <div style={{ background: "white" }}>
          <div
            style={{
              background: "var(--ion-color-blue)",
              position: "relative",
              height: "23vh",
              paddingTop: "2vh",
            }}
          >
            <svg
              viewBox="0 0 100 75"
              width="100%"
              height="15vh"
              preserveAspectRatio="none"
              style={{
                position: "absolute",
                // marginBottom: "-1px",
                bottom: 0,
                display: "block",
              }}
            >
              <path d="M 0 75 S 50 0, 100 75" fill="white" stroke="none" />
            </svg>
            {adList}
          </div>
        </div>

        {orgList}
      </IonContent>
    </IonPage>
  );
};
