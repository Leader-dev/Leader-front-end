import {
  IonPage,
  IonContent,
  IonButton,
  IonInput,
  IonAvatar,
  IonText,
  IonCheckbox,
  IonProgressBar,
} from "@ionic/react";
import { useEffect, useState } from "react";
import Joi from "joi";

import { login, register, sendPhoneAuthCode } from "@/services/user";
import coffeeImage from "./coffee.jpg";

interface SVGIndicatorProps {
  position: 0 | 1;
  duration: number;
  height?: number;
}

const SVGIndicator: React.FC<SVGIndicatorProps> = ({
  position,
  height,
  duration,
}) => {
  const heightPX = `${height ?? 42}px`;
  const width = "50vw";
  return (
    <div
      style={{
        position: "absolute",
        top: "-" + heightPX,
        width,
        transform: position ? "translateX(50vw)" : "",
        transition: `transform ${duration}s ease-in-out`,
        margin: "1px",
      }}
    >
      <svg
        width={width}
        height={heightPX}
        viewBox="0 0 800 133"
        version="1.1"
        preserveAspectRatio="none"
        xmlns="http://www.w3.org/2000/svg"
        style={{ display: "block" }}
      >
        <path
          d="M0,133 L800,133 C667.333333,124.133333 580.666667,110.833333 540,93.1 C479,66.5 479,0 400,0 C321,0 321,67.165 260,93.1 C219.333333,110.39 132.666667,123.69 0,133 Z"
          id="Path"
          fill="#FFFFFF"
        ></path>
      </svg>
    </div>
  );
};

interface BackgroundSwipeTabsProps {
  titleLeft: string;
  titleRight: string;
  left: React.ReactNode;
  right: React.ReactNode;
}

const BackgroundSwipeTabs: React.FC<BackgroundSwipeTabsProps> = ({
  right,
  left,
  titleRight,
  titleLeft,
}) => {
  const [index, setIndex] = useState<0 | 1>(0);
  const height = 36;
  const duration = 0.75;
  const getTitleStyles = (active: boolean): React.CSSProperties => {
    return {
      position: "absolute",
      top: `-${height + 76}px`,
      backgroundColor: active ? "white" : "",
      borderRadius: "50%",
      width: "64px",
      height: "64px",
      //   boxSizing: "border-box",
      lineHeight: "60px",
      textAlign: "center",
      transform: `translateX(-50%) ${!active ? "translateY(36px)" : ""}`,
      color: active ? "var(--ion-color-primary-shade)" : "white",
      transitionProperty: "background-color transform color",
      transition: `${duration}s ease-in-out`,
    };
  };

  return (
    <>
      <img
        src={coffeeImage}
        alt=""
        style={{
          objectFit: "cover",
          width: "100%",
          height: "32%",
          display: "block",
          filter: "opacity(85%)",
        }}
      />
      <div style={{ height: "68%", width: "100%", position: "relative" }}>
        <div
          style={{
            ...getTitleStyles(!index),
            left: "25vw",
          }}
          onClick={() => setIndex(0)}
        >
          {titleLeft}
        </div>
        <div
          style={{
            ...getTitleStyles(!!index),
            left: "75vw",
          }}
          onClick={() => setIndex(1)}
        >
          {titleRight}
        </div>
        <SVGIndicator position={index} duration={duration} height={height} />
        {index ? right : left}
      </div>
    </>
  );
};

const CustomInput: React.FC<Parameters<typeof IonInput>[0]> = (props) => {
  return (
    <div
      style={{
        margin: "24px 32px",
      }}
    >
      <IonInput
        style={{
          border: "2px solid var(--ion-color-primary)",
          borderRadius: "99999px",
          color: "var(--ion-color-primary-tint)",
        }}
        {...props}
      />
    </div>
  );
};

const Login: React.VFC = () => {
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  return (
    <div style={{ textAlign: "center", padding: "32px 0" }}>
      <IonAvatar style={{ margin: "auto", height: "128px", width: "128px" }}>
        <img
          alt="avatar"
          src="https://avatars.githubusercontent.com/u/45055133?v=4"
        />
      </IonAvatar>
      <IonText color="primary">
        <h2>用户名</h2>
      </IonText>
      <CustomInput
        value={phone}
        onIonChange={(e) => setPhone(e.detail.value!)}
        type="tel"
        placeholder="手机号"
      />
      <CustomInput
        value={password}
        onIonChange={(e) => setPassword(e.detail.value!)}
        type="password"
        placeholder="密码"
      />
      <div style={{ margin: "-8px auto 0" }}>
        <IonButton fill="clear">忘记密码</IonButton>
      </div>
      <div style={{ margin: "8px 24px" }}>
        <IonButton
          expand="block"
          size="large"
          onClick={() => {
            login({ phone, password });
          }}
        >
          登录
        </IonButton>
      </div>
    </div>
  );
};

interface StageOneCallbackParams {
  nickname: string;
  password: string;
}

const StageOne: React.FC<{ cb: (params: StageOneCallbackParams) => void }> = ({
  cb,
}) => {
  const [agreed, setAgreed] = useState(false);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [checkPassword, setCheckPassword] = useState("");
  return (
    <>
      <CustomInput
        value={username}
        onIonChange={(e) => setUsername(e.detail.value!)}
        type="text"
        placeholder="用户名"
      />
      <CustomInput
        value={password}
        onIonChange={(e) => setPassword(e.detail.value!)}
        type="password"
        placeholder="密码"
      />
      <CustomInput
        value={checkPassword}
        onIonChange={(e) => setCheckPassword(e.detail.value!)}
        type="password"
        placeholder="确认密码"
      />
      <div
        style={{
          margin: "24px 32px",
          lineHeight: "26px",
        }}
      >
        <IonCheckbox
          style={{
            verticalAlign: "middle",
            marginRight: "4px",
          }}
          checked={agreed}
          onClick={() => {
            setAgreed(!agreed);
          }}
        />
        我已阅读并同意<IonText color="primary">用户协议</IonText>
      </div>
      <div style={{ margin: "24px 32px" }}>
        <IonButton
          disabled={!agreed}
          expand="block"
          onClick={() => {
            // verify inputs
            if (
              !Joi.string().required().min(6).max(12).validate(username)
                .error &&
              !Joi.string().min(8).max(24).validate(password).error &&
              password === checkPassword
            ) {
              cb({ nickname: username, password });
            } else {
              // TODO: provide error message
            }
          }}
        >
          下一步
        </IonButton>
      </div>
    </>
  );
};

interface StageTwoCallbackParams {
  phone: string;
}

const StageTwo: React.FC<{ cb: (params: StageTwoCallbackParams) => void }> = ({
  cb,
}) => {
  const [phone, setPhone] = useState("");
  return (
    <>
      <CustomInput
        value={phone}
        onIonChange={(e) => setPhone(e.detail.value!)}
        type="tel"
        placeholder="绑定手机号"
      />
      <div style={{ margin: "24px 32px" }}>
        <IonButton
          expand="block"
          onClick={() => {
            // verify inputs
            if (
              !Joi.string()
                .required()
                .pattern(/^[1][3,5,7,8][0-9]\d{8}$/)
                .validate(phone).error
            ) {
              cb({ phone });
            } else {
              // TODO: provide error message
            }
          }}
        >
          下一步
        </IonButton>
      </div>
    </>
  );
};

interface StageThreeCallbackParams {
  authcode: string;
}

const StageThree: React.FC<{
  cb: (params: StageThreeCallbackParams) => void;
}> = ({ cb }) => {
  const [authcode, setAuthcode] = useState("");
  return (
    <>
      <CustomInput
        value={authcode}
        onIonChange={(e) => setAuthcode(e.detail.value!)}
        type="text"
        placeholder="输入验证码"
      />
      <div style={{ margin: "24px 32px" }}>
        <IonButton
          expand="block"
          onClick={() => {
            // verify inputs
            if (!Joi.string().required().length(6).validate(authcode).error) {
              cb({ authcode });
            } else {
              // TODO: provide error message
            }
          }}
        >
          完成
        </IonButton>
      </div>
    </>
  );
};

const Register: React.VFC = () => {
  const [stage, setStage] = useState<0 | 1 | 2>(0);
  const [creds, setCreds] = useState({
    nickname: "",
    password: "",
    phone: "",
    authcode: "",
  });
  const stageOneCallback = ({
    nickname,
    password,
  }: {
    nickname: string;
    password: string;
  }) => {
    setStage(1);
    setCreds({ ...creds, nickname, password });
  };
  const stageTwoCallback = ({ phone }: { phone: string }) => {
    setStage(2);
    setCreds({ ...creds, phone });
    sendPhoneAuthCode({ phone });
  };
  const stageThreeCallback = ({ authcode }: { authcode: string }) => {
    setCreds({ ...creds, authcode });
    register({ ...creds, authcode });
  };
  return (
    <div
      style={{
        textAlign: "center",
        padding: "32px 0",
        position: "relative",
        height: "100%",
      }}
    >
      {(() => {
        switch (stage) {
          case 0:
            return <StageOne cb={stageOneCallback} />;
          case 1:
            return <StageTwo cb={stageTwoCallback} />;
          case 2:
            return <StageThree cb={stageThreeCallback} />;
        }
      })()}
      <div
        style={{
          position: "absolute",
          bottom: 0,
          padding: "48px 8vw",
          boxSizing: "border-box",
          width: "100%",
        }}
      >
        <IonProgressBar color="primary" value={0.33 * stage + 0.1} />
      </div>
    </div>
  );
};

const SignUpPage: React.FC = () => {
  return (
    <IonPage>
      <IonContent fullscreen>
        <BackgroundSwipeTabs
          titleLeft="登录"
          left={<Login />}
          titleRight="注册"
          right={<Register />}
        />
      </IonContent>
    </IonPage>
  );
};

export default SignUpPage;
