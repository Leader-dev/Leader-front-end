import {
  IonContent,
  IonHeader,
  IonPage,
  IonTitle,
  IonToolbar,
  IonIcon,
  IonAvatar,
} from "@ionic/react";
import { alertCircleOutline } from "ionicons/icons";

import "./index.css";

const BannerContainer: React.FC = ({ children }) => {
  return (
    <div style={{ background: "white" }}>
      <div
        style={{
          height: "160px",
          background: "grey",
          position: "relative",
        }}
      >
        <svg
          viewBox="0 0 100 75"
          width="100%"
          height="100px"
          preserveAspectRatio="none"
          style={{
            position: "absolute",
            bottom: "-0px",
          }}
        >
          <path d="M 0 75 S 50 0, 100 75" fill="white" stroke="none" />
        </svg>
      </div>
      {children}
    </div>
  );
};

const ProfileMain: React.FC = () => {
  return (
    <div style={{ padding: "32px 20px 26px" }}>
      <div
        style={{
          margin: "auto",
          boxShadow: "rgb(0 0 0 / 12%) 0px 4px 16px",
          textAlign: "center",
          padding: "20px",
          borderRadius: "16px",
        }}
      >
        <div style={{ position: "relative", height: "24px" }}>
          <IonAvatar
            style={{
              position: "absolute",
              top: "50%",
              left: "50%",
              width: "128px",
              height: "128px",
              transform: "translate(-50%, -50%) translateY(-64px)",
            }}
          >
            <img src="https://avatars.githubusercontent.com/u/45055133?v=4" />
          </IonAvatar>
        </div>
        <div style={{ fontSize: "1.5rem" }}>吴亦凡</div>
        <div>
          <IonIcon icon={alertCircleOutline} />
          待认证
        </div>
      </div>
    </div>
  );
};

const Personal: React.FC = () => {
  return (
    <IonPage>
      <IonContent fullscreen>
        <BannerContainer>
          <ProfileMain />
        </BannerContainer>
      </IonContent>
    </IonPage>
  );
};

export default Personal;
