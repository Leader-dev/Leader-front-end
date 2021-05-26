import {
  IonContent,
  IonPage,
  IonIcon,
  IonAvatar,
  IonGrid,
  IonCol,
  IonRow,
} from "@ionic/react";
import {
  alertCircleOutline,
  heartOutline,
  libraryOutline,
  notificationsOutline,
  personOutline,
  settingsOutline,
} from "ionicons/icons";

import "./index.css";
import * as React from "react";

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
            display: "block",
            margin: "-1px",
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

interface CuboidLinkProps {
  icon: string;
  title: string;
}

const CuboidLink: React.FC<CuboidLinkProps> = ({ icon, title }) => {
  return (
    <div
      style={{
        padding: "12px",
      }}
    >
      <div
        style={{
          borderRadius: "16px",
          boxShadow: "rgb(0 0 0 / 12%) 0px 4px 16px",
          textAlign: "center",
          padding: "12px 14px",
          color: "#2183f3",
        }}
      >
        <IonIcon
          style={{
            display: "block",
            margin: "auto",
          }}
          icon={icon}
          size="large"
        />
        <span
          style={{
            fontSize: "12px",
          }}
        >
          {title}
        </span>
      </div>
    </div>
  );
};

const ProfileItems: React.FC = () => {
  return (
    <IonGrid>
      <IonRow>
        <IonCol>yay</IonCol>
        <IonCol>Yay</IonCol>
      </IonRow>
      <IonRow>
        <IonCol size="4">
          <CuboidLink title="我的履历" icon={libraryOutline} />
        </IonCol>
        <IonCol size="4">
          <CuboidLink title="我的收藏" icon={heartOutline} />
        </IonCol>
        <IonCol size="4">
          <CuboidLink title="我的名片" icon={personOutline} />
        </IonCol>
      </IonRow>
      <IonRow>
        <IonCol offset="2" size="4">
          <CuboidLink title="我的设置" icon={settingsOutline} />
        </IonCol>
        <IonCol size="4">
          <CuboidLink title="官方通知" icon={notificationsOutline} />
        </IonCol>
      </IonRow>
    </IonGrid>
  );
};

const Personal: React.FC = () => {
  return (
    <IonPage>
      <IonContent fullscreen scrollY={false}>
        <BannerContainer>
          <ProfileMain />
          <ProfileItems />
        </BannerContainer>
      </IonContent>
    </IonPage>
  );
};

export default Personal;
