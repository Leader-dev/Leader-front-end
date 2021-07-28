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

export default () => {
  const [open, setOpen] = useState<boolean>();
  const [maximumApplication, setMaximumApplication] = useState<number>();
  const [questions, setQuestions] =
    useState<{ questions: string; required: boolean }>();

  return (
    <>
      <IonItem>
        <IonLabel>是否开启主页申请通道</IonLabel>
        <IonToggle checked={open} />
      </IonItem>
      <IonItem>
        <IonLabel>是否限制招新名额上限制</IonLabel>
        <IonToggle checked={maximumApplication !== -1} />
      </IonItem>
      <IonItem>
        <IonLabel>招新人数上限：</IonLabel>
        <IonInput value={maximumApplication} />
      </IonItem>
      <IonItem>
        <IonLabel>已用招新名额：</IonLabel>
        <IonInput value={maximumApplication} />
        <IonButton>清零</IonButton>
      </IonItem>

      <h6>申请者审核:</h6>
      <IonItem>
        <IonLabel style={{ color: "primary" }}>您的姓名</IonLabel>
      </IonItem>

      <IonLabel>添加各部门招新审核人</IonLabel>
      <IonButton fill="clear">
        点击设置
        <IonIcon icon={chevronForward} />
      </IonButton>
    </>
  );
};
