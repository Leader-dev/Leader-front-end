import * as React from "react";
import {
  IonButton,
  IonContent,
  IonHeader,
  IonInput,
  IonItem,
  IonLabel,
  IonPage,
  useIonAlert,
  useIonRouter,
} from "@ionic/react";
import ToolbarWithBackButton from "@/components/ToolbarWithBackButton";
import { useState } from "react";
import { sendPhoneAuthCode } from "@/services/user";
import { useUserPhone } from "@/services/user/phone";
import { useToast } from "@/utils/toast";
import { checkAuthcode } from "@/services/user/changePassword";
import { deleteUser } from "@/services/user/delete";

export default () => {
  let { data: phone } = useUserPhone();
  const [presentToast] = useToast();
  const [authCode, setAuthCode] = useState<string>();

  if (!phone) {
    return <div>loading</div>;
  }

  const history = useIonRouter();
  const [present] = useIonAlert();

  return (
    <IonPage>
      <IonHeader>
        <ToolbarWithBackButton title={"注销账户"} border={true} />
      </IonHeader>
      <IonContent fullscreen>
        <div
          style={{
            textAlign: "center",
            fontSize: "90%",
            marginTop: "25px",
            marginBottom: "15px",
          }}
        >
          <div>为了您的账户安全，需要验证您的手机</div>
          <div>
            {phone.slice(0, 4)}*****{phone.slice(-3)}
          </div>
        </div>
        <IonItem>
          <IonLabel>验证码</IonLabel>
          <IonInput
            value={authCode}
            type={"number"}
            placeholder={"请输入验证码"}
            onIonChange={(e) => setAuthCode(e.detail.value!)}
          >
            <IonButton
              style={{ order: 1 }}
              fill="clear"
              size="small"
              onClick={(e) => {
                e.stopPropagation();
                sendPhoneAuthCode({ phone: phone! })
                  .then(() => {
                    presentToast({ message: "验证码已发送" });
                  })
                  .catch(() => {
                    presentToast({
                      message: "验证码发送失败",
                      color: "warning",
                    });
                  });
              }}
            >
              获取验证码
            </IonButton>
          </IonInput>
        </IonItem>

        <IonButton
          color={"danger"}
          style={{ margin: "25px 15px" }}
          expand={"block"}
          onClick={() => {
            present({
              message: "是否确认注销账户",
              buttons: [
                "取消",
                {
                  text: "确认",
                  handler: () => {
                    deleteUser({ authcode: authCode! })
                      .then(() => {
                        console.log("deleted");
                      })
                      .catch((err) => {
                        switch (err) {
                          case "authcode_incorrect":
                            presentToast({ message: "验证码错误" });
                            break;
                          default:
                            presentToast({ message: err });
                        }
                      });
                  },
                },
              ],
            });
          }}
        >
          确认注销
        </IonButton>
      </IonContent>
    </IonPage>
  );
};
