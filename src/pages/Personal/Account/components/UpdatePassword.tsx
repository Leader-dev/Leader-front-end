import * as React from "react";
import {
  IonButton,
  IonContent,
  IonHeader,
  IonInput,
  IonItem,
  IonLabel,
  IonPage,
  useIonRouter,
} from "@ionic/react";
import { ToolbarWithBackButton } from "@/components/ToolbarWithBackButton";
import { useState } from "react";
import { sendPhoneAuthCode } from "@/services/user";
import { useToast } from "@/utils/toast";
import { checkAuthcode } from "@/services/user/changePassword";
import { changePassword } from "@/services/user";
import { useUserPhone } from "@/services/user/phone";

const CheckAuth = ({
  states,
  setStates,
  phone,
}: {
  states: any[];
  setStates: any[];
  phone: string;
}) => {
  const [present] = useToast();
  const [authCode, step] = states;
  const [setAuthCode, setStep] = setStates;

  const handleOnClick = () => {
    checkAuthcode({ phone: null, authcode: authCode })
      .then(() => setStep(step + 1))
      .catch((err) => {
        switch (err) {
          case "phone_not_exist":
            present({ message: "手机号错误" });
            break;
          case "authcode_incorrect":
            present({ message: "验证码错误" });
            break;
          default:
            present({ message: err });
        }
      });
  };

  return (
    <>
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
          onIonChange={(e) => setAuthCode(parseInt(e.detail.value!, 10))}
        >
          <IonButton
            style={{ order: 1 }}
            fill="clear"
            size="small"
            onClick={(e) => {
              e.stopPropagation();
              sendPhoneAuthCode({ phone: phone })
                .then(() => {
                  present({ message: "验证码已发送" });
                })
                .catch(() => {
                  present({ message: "验证码发送失败", color: "warning" });
                });
            }}
          >
            获取验证码
          </IonButton>
        </IonInput>
      </IonItem>

      <IonButton
        style={{ margin: "25px 15px" }}
        expand="block"
        onClick={handleOnClick}
      >
        下一步
      </IonButton>
    </>
  );
};

const ChangePass = () => {
  const Joi = require("joi");
  const [present] = useToast();
  const [checkPassword, setCheckPassword] = useState("");
  const [password, setPassword] = useState("");
  const history = useIonRouter();

  const handleOnClick = () => {
    // verify inputs
    const { error } = Joi.object({
      password: Joi.string().min(8).max(24),
      checkPassword: Joi.ref("password"),
    }).validate({ password, checkPassword });
    if (!error) {
      changePassword({ phone: null, password: password })
        .then(() => {
          present({ message: "修改成功" });
          history.push("info-security");
        })
        .catch((err) => present({ message: err }));
    } else {
      switch (error.details[0].message) {
        case '"password" is not allowed to be empty':
          present({ message: "密码不得为空" });
          break;
        case '"password" length must be at least 8 characters long':
          present({ message: "密码需要至少 8 个字符" });
          break;
        case '"password" length must be less than or equal to 24 characters long':
          present({ message: "密码不得超过 24 个字符" });
          break;
        case '"checkPassword" must be [ref:password]':
          present({ message: "密码必须相同" });
          break;
        default:
          present({ message: error.details[0].message });
      }
    }
  };

  return (
    <div>
      <IonItem>
        <IonLabel>新密码&emsp;</IonLabel>
        <IonInput
          type={"password"}
          placeholder="8～24个字符"
          onIonChange={(e) => setPassword(e.detail.value!)}
        />
      </IonItem>
      <IonItem>
        <IonLabel>确认密码</IonLabel>
        <IonInput
          type={"password"}
          placeholder="8～24个字符"
          onIonChange={(e) => setCheckPassword(e.detail.value!)}
        />
      </IonItem>
      <IonButton
        style={{ margin: "25px 15px" }}
        expand="block"
        onClick={handleOnClick}
      >
        确认修改
      </IonButton>
    </div>
  );
};

export default () => {
  const [authCode, setAuthCode] = useState<number>();
  const [step, setStep] = useState<number>(1);
  let { data: phone, error } = useUserPhone();

  if (!phone) {
    return <div>loading</div>;
  }

  let content;
  if (step === 1) {
    content = (
      <CheckAuth
        states={[authCode, step]}
        setStates={[setAuthCode, setStep]}
        phone={phone}
      />
    );
  } else {
    content = <ChangePass />;
  }

  return (
    <IonPage>
      <IonHeader>
        <ToolbarWithBackButton title={"更新密码"} />
      </IonHeader>
      <IonContent fullscreen>{content}</IonContent>
    </IonPage>
  );
};
