import * as React from "react";
import {
  IonButton,
  IonIcon,
  IonInput,
  IonItem,
  IonLabel,
  IonNote,
  IonToggle,
  isPlatform,
} from "@ionic/react";
import { CSSProperties, useState } from "react";
import { chevronForward } from "ionicons/icons";
import { useOrgRecruitSetting } from "@/types/recruit";
import RecruitQuestions from "./RecruitQuestions";

export default ({ recruitInfo }: { recruitInfo: useOrgRecruitSetting }) => {
  const { scheme, receivedApplicationCount } = recruitInfo;
  const [open, setOpen] = useState<boolean>(scheme.open);
  // const [open, setOpen] = useState<boolean>(true);
  const [maximumApplication, setMaximumApplication] = useState<number>(
    scheme.maximumApplication
  );
  const [limitChecked, setLimitChecked] = useState<boolean>(
    maximumApplication !== -1
  );
  const [questions, setQuestions] = useState<
    { question: string; required: boolean }[]
  >(scheme.questions);
  // const [questions, setQuestions] = useState<
  //   { question: string; required: boolean }[]
  // >([{question: "a", required: true}]);
  const [received, setReceived] = useState<number>(receivedApplicationCount);
  let reset = false;

  // const platform = isPlatform("ios")

  const iOSToggleStyle = {
    height: "20px",
    width: "45px",
    "--handle-width": "35%",
  };

  return (
    <form>
      <IonItem>
        <IonLabel>是否开启主页申请通道</IonLabel>
        <IonToggle checked={open} onIonChange={() => setOpen(!open)} />
      </IonItem>
      {open ? (
        <>
          <IonItem style={{ "--border-style": "none" }}>
            <IonLabel>是否限制招新名额上限制</IonLabel>
            <IonToggle
              checked={limitChecked}
              onIonChange={(e) => setLimitChecked(e.detail.checked)}
            />
          </IonItem>
          {limitChecked ? (
            <IonItem>
              <IonLabel>招新人数上限：</IonLabel>
              <IonInput
                style={{ marginLeft: "-7px" }}
                value={maximumApplication}
                onIonChange={() => setMaximumApplication(maximumApplication)}
              />
            </IonItem>
          ) : (
            <IonItem disabled>
              <IonLabel>招新人数上限：</IonLabel>
              <IonInput
                style={{ marginLeft: "-7px" }}
                value={maximumApplication}
              />
            </IonItem>
          )}
          <IonItem>
            <IonLabel>已用招新名额：{received}</IonLabel>
            <IonNote slot="end">
              <IonButton
                color="warning"
                onClick={() => {
                  reset = true;
                  setReceived(0);
                }}
              >
                清零
              </IonButton>
            </IonNote>
          </IonItem>

          <h5 style={{ marginLeft: "15px", marginTop: "30px" }}>申请者审核:</h5>
          <IonItem>
            <IonLabel style={{ color: "primary" }}>
              <span
                style={{
                  color: "red",
                  marginLeft: "14px",
                  marginRight: "4px",
                  fontWeight: "bold",
                }}
              >
                *
              </span>
              1.
              <span style={{ marginLeft: "6px" }}>您的姓名</span>
            </IonLabel>
          </IonItem>

          <RecruitQuestions questions={questions} setQuestions={setQuestions} />

          <IonItem>
            <IonLabel>添加各部门招新审核人</IonLabel>
            <IonButton fill="clear">
              点击设置
              <IonIcon icon={chevronForward} />
            </IonButton>
          </IonItem>
          <IonButton
            style={{ margin: "25px 15px" }}
            expand="block"
            type="submit"
          >
            确认
          </IonButton>
        </>
      ) : (
        ""
      )}
    </form>
  );
};
