import {
  IonPage,
  IonContent,
  IonButton,
  IonInput,
  IonAvatar,
  IonText,
  IonCheckbox,
  IonProgressBar,
  useIonRouter,
  createAnimation,
  AnimationBuilder,
  useIonModal,
  IonToolbar,
  IonTitle,
  IonHeader,
  IonButtons,
} from "@ionic/react";
import * as React from "react";
import { MouseEventHandler, useState } from "react";
import ReactMarkdown from "react-markdown";
import Joi from "joi";
import { useToast } from "@/utils/toast";
import {
  changePassword,
  login,
  register,
  sendPhoneAuthCode,
  userExist,
} from "@/services/user";
import coffeeImage from "./coffee.jpg";
import { checkAuthcode } from "@/services/user/changePassword";
import { usePrivacyAgreement } from "@/services/app/privacy";
import { useUserAgreement } from "@/services/app/agreement";
import { mutate } from "swr";
import { useStartUrl } from "@/services/service/image/accessStartUrl";

interface SVGIndicatorProps {
  position: 0 | 1;
  duration: number;
  height?: number;
}

const signupPageAnimationBuilder: AnimationBuilder = (baseEl, opts) => {
  // reference: <https://medium.com/nerd-for-tech/ionic-react-implementing-custom-page-transition-animation-48aa3086e9da>
  const enteringAnimation = createAnimation()
    .addElement(opts.enteringEl)
    .fromTo("opacity", 0, 1)
    .duration(250);

  const leavingAnimation = createAnimation()
    .addElement(opts.leavingEl)
    .fromTo("opacity", 1, 0)
    .duration(250);

  const animation = createAnimation()
    .addAnimation(enteringAnimation)
    .addAnimation(leavingAnimation);
  return animation;
};

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
  const [index, setIndex] = useState<0 | 1>(1);
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

const CustomInputWithButton: React.FC<{
  inputProps?: Parameters<typeof IonInput>[0];
  endText: string;
  onEndClick: MouseEventHandler<HTMLIonButtonElement>;
}> = ({ inputProps, endText, onEndClick }) => {
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
        {...inputProps}
      >
        <IonButton
          style={{ order: 1 }}
          fill="clear"
          size="small"
          onClick={(e) => {
            e.stopPropagation();
            onEndClick(e);
          }}
        >
          {endText}
        </IonButton>
      </IonInput>
    </div>
  );
};

enum Stat {
  Auth,
  Pswd,
  Recover,
}

interface LoginSectionProps {
  cb: () => void;
  onStatChange: (stat: Stat) => void;
}

const LoginByPass: React.FC<LoginSectionProps> = ({ cb, onStatChange }) => {
  const [present] = useToast();
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const { data: startUrl } = useStartUrl();
  return (
    <div style={{ textAlign: "center", padding: "32px 0" }}>
      <IonAvatar style={{ margin: "auto", height: "128px", width: "128px" }}>
        <img
          alt="avatar"
          src={startUrl + "v1_kFyRFV8KphjM31x03ykLjBshXLnXrabA"}
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
        <IonButton
          fill="clear"
          onClick={() => {
            onStatChange(Stat.Recover);
          }}
        >
          忘记密码
        </IonButton>
        <IonButton
          fill="clear"
          onClick={() => {
            onStatChange(Stat.Auth);
          }}
        >
          验证码登录
        </IonButton>
      </div>
      <div style={{ margin: "8px 24px" }}>
        <IonButton
          expand="block"
          size="large"
          onClick={() => {
            login({ phone, password })
              .then(() => {
                cb();
              })
              .catch((err) => {
                switch (err) {
                  case "password_incorrect":
                    present({ message: "手机号或密码错误", color: "warning" });
                    break;
                  case "user_not_exist":
                    present({ message: "手机号错误", color: "warning" });
                    break;
                  case "need_info":
                    present({
                      message: "请在注册页面补充信息",
                      color: "warning",
                    });
                    break;
                  default:
                    present({ message: err });
                }
              });
          }}
        >
          登入
        </IonButton>
      </div>
    </div>
  );
};

const LoginByAuth: React.FC<LoginSectionProps> = ({ cb, onStatChange }) => {
  const [present] = useToast();
  const [phone, setPhone] = useState("");
  const [authcode, setAuthcode] = useState("");
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
      <CustomInputWithButton
        inputProps={{
          value: phone,
          onIonChange: (e) => setPhone(e.detail.value!),
          type: "tel",
          placeholder: "手机号",
        }}
        endText="获取验证码"
        onEndClick={() => {
          userExist({ phone }).then((exists) => {
            if (exists) {
              sendPhoneAuthCode({ phone })
                .then(() => {
                  present({ message: "验证码已发送" });
                })
                .catch(() => {
                  present({ message: "验证码发送失败", color: "warning" });
                });
            } else {
              present({ message: "用户不存在", color: "warning" });
            }
          });
        }}
      />
      <CustomInput
        value={authcode}
        onIonChange={(e) => setAuthcode(e.detail.value!)}
        type="number"
        placeholder="验证码"
      />
      <div style={{ margin: "-8px auto 0" }}>
        <IonButton
          fill="clear"
          onClick={() => {
            onStatChange(Stat.Recover);
          }}
        >
          忘记密码
        </IonButton>
        <IonButton
          fill="clear"
          onClick={() => {
            onStatChange(Stat.Pswd);
          }}
        >
          密码登录
        </IonButton>
      </div>
      <div style={{ margin: "8px 24px" }}>
        <IonButton
          expand="block"
          size="large"
          onClick={() => {
            login({ phone, authcode })
              .then(() => {
                cb();
              })
              .catch((err) => {
                switch (err) {
                  case "password_incorrect":
                    present({ message: "手机号或密码错误" });
                    break;
                  case "user_not_exist":
                    present({ message: "手机号错误" });
                    break;
                  case "authcode_incorrect":
                    present({ message: "验证码错误" });
                    break;
                  case "need_info":
                    present({ message: "需要补充个人信息", color: "warning" });
                    window.location.reload();
                    break;
                  default:
                    present({ message: err });
                    console.log({ err });
                }
              });
          }}
        >
          登入
        </IonButton>
      </div>
    </div>
  );
};

const ForgotPassword: React.FC<LoginSectionProps> = ({ cb, onStatChange }) => {
  const [present] = useToast();
  const [phone, setPhone] = useState("");
  const [authcode, setAuthcode] = useState("");
  const [pswd, setPswd] = useState(""); // password
  const [ckps, setCkps] = useState(""); // password check
  const [stage, setStage] = useState<1 | 0>(0);
  if (!stage) {
    return (
      <div style={{ textAlign: "center", padding: "32px 0" }}>
        <IonText color="primary">
          <h2>忘记密码</h2>
          <p>请进行手机号验证已确认为您本人操作</p>
        </IonText>
        <CustomInputWithButton
          inputProps={{
            value: phone,
            onIonChange: (e) => setPhone(e.detail.value!),
            type: "tel",
            placeholder: "手机号",
          }}
          endText="获取验证码"
          onEndClick={() => {
            userExist({ phone }).then((exists) => {
              if (exists) {
                sendPhoneAuthCode({ phone })
                  .then(() => {
                    present({ message: "验证码已发送" });
                  })
                  .catch(() => {
                    present({ message: "验证码发送失败", color: "warning" });
                  });
              } else {
                present({ message: "用户不存在", color: "warning" });
              }
            });
          }}
        />
        <CustomInput
          value={authcode}
          onIonChange={(e) => setAuthcode(e.detail.value!)}
          type="number"
          placeholder="验证码"
        />
        <div style={{ margin: "-8px auto 0" }}>
          <IonButton
            fill="clear"
            onClick={() => {
              onStatChange(Stat.Pswd);
            }}
          >
            返回登录
          </IonButton>
        </div>
        <div style={{ margin: "8px 24px" }}>
          <IonButton
            expand="block"
            size="large"
            onClick={() => {
              checkAuthcode({ phone, authcode })
                .then(() => {
                  setStage(1);
                })
                .catch((err) => {
                  switch (err) {
                    case "user_not_exist":
                      present({ message: "手机号错误" });
                      break;
                    case "authcode_incorrect":
                      present({ message: "验证码错误" });
                      break;
                    default:
                      present({ message: err });
                      console.log({ err });
                  }
                });
            }}
          >
            下一步
          </IonButton>
        </div>
      </div>
    );
  } else {
    return (
      <div style={{ textAlign: "center", padding: "32px 0" }}>
        <IonText color="primary">
          <h2>忘记密码</h2>
          <p>请进行手机号验证已确认为您本人操作</p>
        </IonText>
        <CustomInput
          value={pswd}
          onIonChange={(e) => setPswd(e.detail.value!)}
          type="password"
          placeholder="更改密码"
        />
        <CustomInput
          value={ckps}
          onIonChange={(e) => setCkps(e.detail.value!)}
          type="password"
          placeholder="确认密码"
        />
        <div style={{ margin: "8px 24px" }}>
          <IonButton
            expand="block"
            size="large"
            onClick={() => {
              changePassword({ phone, password: pswd })
                .then(() => {
                  cb();
                })
                .catch((err) => {
                  switch (err) {
                    case "user_not_exist":
                      present({ message: "手机号错误" });
                      break;
                    case "authcode_incorrect":
                      present({ message: "验证码错误" });
                      break;
                    default:
                      present({ message: err });
                      console.log({ err });
                  }
                });
            }}
          >
            修改密码
          </IonButton>
        </div>
      </div>
    );
  }
};

const Login: React.VFC = () => {
  // 三种状态对应验证码与密码登录、忘记密码和设置密码
  const [status, setStatus] = useState<Stat>(Stat.Pswd);
  const [present] = useToast();
  const { push } = useIonRouter();
  switch (status) {
    case Stat.Pswd:
      return (
        <LoginByPass
          cb={async () => {
            present({ message: "登录成功" });
            await mutate("/user/userid");
          }}
          // cb={() => {
          //   present({ message: "登录成功" });
          //   push(
          //     "/tabs/trends",
          //     undefined,
          //     undefined,
          //     undefined,
          //     signupPageAnimationBuilder
          //   );
          // }}
          onStatChange={setStatus}
        />
      );
    case Stat.Auth:
      return (
        <LoginByAuth
          cb={async () => {
            present({ message: "登录成功" });
            await mutate("/user/userid");
          }}
          // cb={() => {
          //   present({ message: "登录成功" });
          //   push(
          //     "/tabs/trends",
          //     undefined,
          //     undefined,
          //     undefined,
          //     signupPageAnimationBuilder
          //   );
          // }}
          onStatChange={setStatus}
        />
      );
    case Stat.Recover:
      return (
        <ForgotPassword
          cb={() => {
            present({ message: "修改成功" });
            setStatus(Stat.Pswd);
          }}
          onStatChange={setStatus}
        />
      );
  }
  return <div>Error</div>;
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

  const { data: privacyTerms } = usePrivacyAgreement();
  const { data: EULA } = useUserAgreement();
  const [presentEULA, closeEULA] = useIonModal(MarkdownModal, {
    md: EULA,
    onClick: () => closeEULA(),
  });
  const [presentPrivacy, closePrivacy] = useIonModal(MarkdownModal, {
    md: privacyTerms,
    onClick: () => closePrivacy(),
  });
  const [present] = useToast();
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
          onIonChange={(e) => {
            setAgreed(e.detail.checked);
          }}
        />
        我已阅读并同意
        <IonText color="primary" onClick={() => presentEULA()}>
          用户协议
        </IonText>
        与
        <IonText color="primary" onClick={() => presentPrivacy()}>
          隐私协议
        </IonText>
      </div>
      <div style={{ margin: "24px 32px" }}>
        <IonButton
          disabled={!agreed}
          expand="block"
          onClick={() => {
            // verify inputs
            const { error } = Joi.object({
              username: Joi.string().required().min(6).max(12),
              password: Joi.string().min(8).max(24),
              checkPassword: Joi.ref("password"),
            }).validate({ username, password, checkPassword });
            if (!error) {
              cb({ nickname: username, password });
            } else {
              switch (error.details[0].message) {
                case '"username" is not allowed to be empty':
                  present({ message: "用户名不得为空" });
                  break;
                case '"username" length must be at least 6 characters long':
                  present({ message: "用户名需要至少 6 个字符" });
                  break;
                case '"username" length must be less than or equal to 12 characters long':
                  present({ message: "用户名不得超过 12 个字符" });
                  break;
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
  const [present] = useToast();
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
            const { error } = Joi.string()
              .required()
              .pattern(/^[1][3,5,7,8][0-9]\d{8}$/)
              .validate(phone);
            if (!error) {
              cb({ phone });
            } else {
              if (error.details[0].message.includes("pattern")) {
                present({ message: "无效手机号" });
                return;
              }
              switch (error.details[0].message) {
                case '"value" is not allowed to be empty':
                  present({ message: "手机号不得为空" });
                  break;
                default:
                  present({ message: error.details[0].message });
              }
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
  const [present] = useToast();
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
            const { error } = Joi.string()
              .required()
              .length(6)
              .validate(authcode);
            if (!error) {
              cb({ authcode });
            } else {
              present({ message: "无效验证码" });
            }
          }}
        >
          完成
        </IonButton>
      </div>
    </>
  );
};

const MarkdownModal = ({
  md,
  onClick,
}: {
  md: string;
  onClick?: () => void;
}) => {
  return (
    <>
      <IonHeader>
        <IonToolbar>
          <IonTitle>协议</IonTitle>
          <IonButtons slot="end">
            <IonButton onClick={onClick}>确定</IonButton>
          </IonButtons>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <div style={{ padding: "18px" }}>
          <IonText>
            <ReactMarkdown>{md}</ReactMarkdown>
          </IonText>
        </div>
      </IonContent>
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
  const [present] = useToast();
  const { push } = useIonRouter();
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
  const stageTwoCallback = async ({ phone }: { phone: string }) => {
    if (await userExist({ phone })) {
      present({ message: "手机号已存在" });
      return;
    }
    setStage(2);
    setCreds({ ...creds, phone });
    sendPhoneAuthCode({ phone });
  };
  const stageThreeCallback = async ({ authcode }: { authcode: string }) => {
    setCreds({ ...creds, authcode });
    try {
      await register({ ...creds, authcode });
      present({ message: "注册成功！" });
      await mutate("/user/userid");
      push(
        "/tabs/trends",
        undefined,
        undefined,
        undefined,
        signupPageAnimationBuilder
      );
    } catch (err) {
      if (err === "authcode_incorrect") {
        present({ message: "验证码错误" });
      }
    }
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
