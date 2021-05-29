import {
  IonContent,
  IonPage,
  IonIcon,
  IonAvatar,
  IonGrid,
  IonCol,
  IonRow,
  IonFab,
  IonFabButton,
  IonBackdrop,
  IonList,
  IonItem,
  IonLabel,
} from "@ionic/react";
import {
  alertCircleOutline,
  chatbubblesOutline,
  heartOutline,
  libraryOutline,
  notificationsOutline,
  personOutline,
  settingsOutline,
} from "ionicons/icons";

import "./index.css";
import { useEffect, useRef, useState } from "react";

const useForceUpdate = () => {
  const [, setValue] = useState(0); // integer state
  return () => setValue((value) => value + 1); // update the state to force render
};

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

const ContactUs: React.FC = () => {
  const [popUpOpen, setPopUpOpen] = useState(false);
  const fabRef = useRef<HTMLIonFabElement>(null);
  const fabRect = fabRef.current?.getBoundingClientRect();
  const update = useForceUpdate();
  useEffect(() => {
    update();
  }, [update]);

  return (
    <>
      <div
        style={{
          position: "fixed",
          left: 0,
          top: 0,
          width: "100vw",
          height: "100vh",
          zIndex: 2,
          background: "#000",
          transition: "opacity 0.3s ease-in-out",
          opacity: popUpOpen ? 0.2 : 0,
          // display: popUpOpen ? "default" : "none",
        }}
        onClick={(e) => {
          if (popUpOpen) {
            e.stopPropagation();
          }
          setPopUpOpen(false);
        }}
      ></div>
      <div
        id="fk"
        style={{
          position: "fixed",
          left: fabRect?.x,
          top: fabRect?.top,
          transform: `translateX(-100%) translateY(-100%) ${
            popUpOpen ? "" : "translateX(-300px)"
          }`,
          background: "white",
          width: "240px",
          height: "300px",
          borderRadius: "30px",
          transitionProperty: "transform opacity",
          transition: "0.3s ease-in-out",
          opacity: popUpOpen ? 1 : 0,
          zIndex: 3,
        }}
      >
        <div
          style={{
            textAlign: "center",
            padding: "12px 0 4px",
            fontSize: "10px",
          }}
        >
          呐，我们就是主创团队了，找我们聊聊吧~
        </div>
        <IonList>
          <IonItem>
            <IonAvatar slot="start">
              <img src="https://avatars.githubusercontent.com/u/45055133?v=4" />
            </IonAvatar>
            <IonLabel>
              <h2>首席产品官</h2>
              <p>你好</p>
            </IonLabel>
          </IonItem>
          <IonItem>
            <IonAvatar slot="start">
              <img src="https://avatars.githubusercontent.com/u/45055133?v=4" />
            </IonAvatar>
            <IonLabel>
              <h2>首席技术官</h2>
              <p>拟好</p>
            </IonLabel>
          </IonItem>
          <IonItem>
            <IonAvatar slot="start">
              <img src="https://avatars.githubusercontent.com/u/45055133?v=4" />
            </IonAvatar>
            <IonLabel>
              <h2>手洗洗手瓜</h2>
              <p>你号</p>
            </IonLabel>
          </IonItem>
        </IonList>
      </div>

      <IonFab ref={fabRef} vertical="bottom" horizontal="end" slot="fixed">
        <IonFabButton
          onClick={() => {
            setPopUpOpen(!popUpOpen);
          }}
        >
          <IonIcon icon={chatbubblesOutline} />
        </IonFabButton>
      </IonFab>
    </>
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
        <ContactUs />
      </IonContent>
    </IonPage>
  );
};

export default Personal;
