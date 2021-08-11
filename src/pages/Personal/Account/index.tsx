import * as React from "react";
import {
  IonButtons,
  IonContent,
  IonHeader,
  IonPage,
  IonTitle,
  IonToolbar,
  IonBackButton,
  IonLabel,
  IonItem,
  IonButton,
  IonRouterOutlet,
  IonItemDivider,
  useIonRouter,
  useIonAlert,
} from "@ionic/react";
import { chevronBack } from "ionicons/icons";
import { Route } from "react-router-dom";
import InfoAndSecurity from "./components/InfoAndSecurity";
import UserContract from "./components/UserContract";
import Contact from "./components/Contact";
import PrivacyPolicy from "./components/PrivacyPolicy";
import About from "./components/About";
import UpdateNickname from "./components/UpdateNickname";
import UpdatePassword from "./components/UpdatePassword";
import { logout } from "@/services/user";
import { mutate } from "swr";

const AccountHome = () => {
  const history = useIonRouter();
  const [present] = useIonAlert();
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonButtons>
            <IonBackButton text="" icon={chevronBack} />
          </IonButtons>
          <IonTitle>设置</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <IonItem button routerLink={"account/info-security"}>
          <IonLabel>账号与安全</IonLabel>
        </IonItem>

        <IonItem button routerLink={"account/user-contract"}>
          <IonLabel>用户协议</IonLabel>
        </IonItem>
        <IonItem button routerLink={"account/privacy-policy"}>
          <IonLabel>隐私政策</IonLabel>
        </IonItem>

        <IonItemDivider />
        <IonItem button routerLink={"account/about"}>
          <IonLabel>关于麟者</IonLabel>
        </IonItem>
        <IonItem button routerLink={"account/contact"}>
          <IonLabel>联系我们</IonLabel>
        </IonItem>

        <IonButton
          style={{ margin: "25px 15px" }}
          expand="block"
          onClick={() => {
            present({
              message: "是否确认退出登陆",
              buttons: [
                "取消",
                {
                  text: "确认",
                  handler: () => {
                    logout().then(async () => {
                      await mutate("/user/userid");
                      history.push("/");
                    });
                  },
                },
              ],
            });
          }}
        >
          退出登陆
        </IonButton>
      </IonContent>
    </IonPage>
  );
};

const AccountRouter: React.FC = () => {
  return (
    <IonPage>
      <IonRouterOutlet>
        <Route exact path="/person/account" component={AccountHome} />
        <Route
          path="/person/account/info-security"
          component={InfoAndSecurity}
        />
        <Route
          path="/person/account/update-nickname/:nickname"
          component={UpdateNickname}
        />
        <Route
          path="/person/account/update-password"
          component={UpdatePassword}
        />
        <Route path="/person/account/user-contract" component={UserContract} />
        <Route
          path="/person/account/privacy-policy"
          component={PrivacyPolicy}
        />
        <Route path="/person/account/about" component={About} />
        <Route path="/person/account/contact" component={Contact} />
      </IonRouterOutlet>
    </IonPage>
  );
};

export default AccountRouter;
