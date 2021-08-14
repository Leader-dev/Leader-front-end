import * as React from "react";
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
  IonList,
  IonItem,
  IonLabel,
  useIonRouter,
  IonImg,
  IonText,
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
import { useEffect, useRef, useState, useCallback } from "react";
import { UserInfo } from "@/types/user";
import { useStartUrl } from "@/services/service/image/accessStartUrl";
import { useUserInfo } from "@/services/user/info/get";
import backIcon from "./background.svg";

const useForceUpdate = () => {
  const [, setValue] = useState(0); // integer state
  return useCallback(() => setValue((value) => value + 1), []);
};

const BannerContainer: React.FC = ({ children }) => {
  return (
    <div style={{ background: "white" }}>
      <div
        style={{
          height: "33vh",
          background: "var(--ion-color-blue)",
          position: "relative",
        }}
      >
        <IonImg
          style={{
            position: "absolute",
            top: "5.5vh",
            left: "0px",
            right: "0px",
          }}
          src={backIcon}
        />
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

interface ProfileMainProps {
  userInfo: UserInfo;
}

const ProfileMain: React.FC<ProfileMainProps> = ({ userInfo }) => {
  const { data: startUrl } = useStartUrl();
  return (
    <div style={{ padding: "35px 20px 0px" }}>
      <div
        style={{
          margin: "auto",
          boxShadow: "rgb(0 0 0 / 12%) 0px 4px 16px",
          textAlign: "center",
          padding: "20px",
          borderRadius: "16px",
        }}
      >
        <div style={{ position: "relative", height: "10px" }}>
          <IonAvatar
            style={{
              position: "absolute",
              top: "25%",
              left: "50%",
              width: "128px",
              height: "128px",
              transform: "translate(-50%, -50%) translateY(-64px)",
            }}
          >
            <IonImg src={startUrl + userInfo.avatarUrl} />
          </IonAvatar>
        </div>
        <div style={{ fontSize: "1.5rem" }}> {userInfo.nickname} </div>
        <IonRow
          className={"ion-align-items-center"}
          style={{ justifyContent: "center", marginTop: "5px" }}
        >
          <IonIcon color={"primary"} icon={alertCircleOutline} />
          <IonText color={"primary"} style={{ marginLeft: "2px" }}>
            {" "}
            待认证{" "}
          </IonText>
        </IonRow>
      </div>
    </div>
  );
};

interface CuboidLinkProps {
  icon: string;
  title: string;
  onClick?: () => void;
}

const CuboidLink: React.FC<CuboidLinkProps> = ({ icon, title, onClick }) => {
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
        onClick={onClick}
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
  const history = useIonRouter();
  return (
    <div style={{ position: "relative", height: "100%", width: "100%" }}>
      <IonGrid
        style={{
          position: "absolute",
          width: "96%",
          top: "30%",
          marginTop: "-50%",
          left: "50%",
          marginLeft: "-48%",
        }}
      >
        <IonRow>
          <IonCol size="4">
            <CuboidLink title="我的履历" icon={libraryOutline} />
          </IonCol>
          <IonCol size="4">
            <CuboidLink
              title="我的收藏"
              icon={heartOutline}
              onClick={() => history.push("/person/favorite")}
            />
          </IonCol>
          <IonCol size="4">
            <CuboidLink title="我的名片" icon={personOutline} />
          </IonCol>
        </IonRow>
        <IonRow>
          <IonCol offset="2" size="4">
            <CuboidLink
              title="我的设置"
              icon={settingsOutline}
              onClick={() => history.push("/person/account")}
            />
          </IonCol>
          <IonCol size="4">
            <CuboidLink title="官方通知" icon={notificationsOutline} />
          </IonCol>
        </IonRow>
      </IonGrid>
    </div>
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
          display: popUpOpen ? "block" : "none",
        }}
        onClick={(e) => {
          if (popUpOpen) {
            e.stopPropagation();
          }
          setPopUpOpen(false);
        }}
      />
      <div
        id="placeholder"
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
  const { data: userInfo, error } = useUserInfo();
  let content;
  if (!userInfo) {
    content = <div>Skeleton</div>;
  } else {
    content = (
      <>
        <BannerContainer>
          <ProfileMain userInfo={userInfo} />
        </BannerContainer>
        <ProfileItems />
        <ContactUs />
      </>
    );
  }

  return (
    <IonPage>
      <IonContent fullscreen>{content}</IonContent>
    </IonPage>
  );
};

export default Personal;
