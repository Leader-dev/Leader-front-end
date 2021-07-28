import * as React from "react";
import {
  IonButton,
  IonIcon,
  IonInput,
  IonItem,
  IonLabel,
  IonSelect,
  IonToggle,
} from "@ionic/react";
import { useState } from "react";
import { chevronForward } from "ionicons/icons";
import { useOrgRecruitSetting } from "@/types/recruit";
import RecruitQuestions from "./RecruitQuestions";

export default ({ recruitInfo }: { recruitInfo: useOrgRecruitSetting }) => {
  const { scheme, receivedApplicationCount } = recruitInfo;
  const [open, setOpen] = useState<boolean>(scheme.open);
  const [maximumApplication, setMaximumApplication] = useState<number>(
    scheme.maximumApplication
  );
  const [questions, setQuestions] = useState<
    { question: string; required: boolean }[]
  >(scheme.questions);
  const [received, setReceived] = useState<number>(receivedApplicationCount);
  let reset = false;

  return (
    <>
      <IonItem>
        <IonLabel>是否开启主页申请通道</IonLabel>
        <IonToggle checked={open} onIonChange={() => setOpen(open)} />
      </IonItem>
      <IonItem>
        <IonLabel>是否限制招新名额上限制</IonLabel>
        <IonToggle checked={maximumApplication !== -1} />
      </IonItem>
      <IonItem>
        <IonLabel>招新人数上限：</IonLabel>
        <IonInput
          value={maximumApplication}
          onIonChange={() => setMaximumApplication(maximumApplication)}
        />
      </IonItem>
      <IonItem>
        <IonLabel>已用招新名额：{received}</IonLabel>
        <IonButton
          onClick={() => {
            reset = true;
            setReceived(0);
          }}
        >
          清零
        </IonButton>
      </IonItem>

      <h6>申请者审核:</h6>
      <IonItem>
        <IonLabel style={{ color: "primary" }}>您的姓名</IonLabel>
      </IonItem>

      <RecruitQuestions questions={questions} setQuestions={setQuestions} />

      <IonLabel>添加各部门招新审核人</IonLabel>
      <IonButton fill="clear">
        点击设置
        <IonIcon icon={chevronForward} />
      </IonButton>
    </>
  );
};
