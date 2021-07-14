import * as React from "react";
import {
  IonIcon,
  IonInput,
  IonItem,
  IonItemDivider,
  IonLabel,
  IonList,
  IonTextarea,
} from "@ionic/react";
import { OrgDetailsResult } from "@/types/organization";
import { useState } from "react";

export default ({ info }: { info: OrgDetailsResult }) => {
  const { detail } = info;
  const questions = detail.applicationScheme.questions;
  const length = questions.length;
  const [answers, setAnswers] = useState(
    Array.from({ length: length }).fill("")
  );
  const [name, setName] = useState<string>();

  let inputList = [];
  for (let i = 0; i < length; i++) {
    let onChange = (e: any) => {
      let newAnswers = [...answers];
      newAnswers[i] = e.target.value;
      setAnswers(newAnswers);
      console.log(newAnswers);
    };
    inputList.push(
      <IonItem>
        <IonLabel position="stacked">{questions[0]}</IonLabel>
        <IonTextarea rows={1} autoGrow={true} onIonChange={onChange} />
      </IonItem>
    );
  }

  return (
    <IonList>
      <IonItem>
        <IonLabel position="stacked"> 您的名字 </IonLabel>
        <IonInput
          required={true}
          clearInput={true}
          value={name}
          onIonChange={(e) => setName(e.detail.value!)}
        />
      </IonItem>
      {inputList}
    </IonList>
  );
};
