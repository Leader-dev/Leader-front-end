import * as React from "react";
import {
  IonButton,
  IonInput,
  IonItem,
  IonLabel,
  IonList,
  IonSelect,
  IonSelectOption,
  IonTextarea,
  isPlatform,
} from "@ionic/react";
import { OrgDetailsResult } from "@/types/organization";
import { useState } from "react";
import "./ApplyForm.css";
import { applyToOrg } from "@/services/org/apply/send";
import { useHistory } from "react-router";

const options = {
  cssClass: "department-select-option",
};

type Department = {
  id: string | null;
  name: string | null;
};

export default ({
  details,
  departments,
}: {
  details: OrgDetailsResult;
  departments: Department[];
}) => {
  const history = useHistory();

  const { detail } = details;
  const applicationInfo = detail.applicationScheme;

  const [name, setName] = useState<string>();
  const [selectedDepartment, setSelectedDepartment] = useState<Department>({
    id: null,
    name: null,
  });
  const questions = applicationInfo.questions;
  const [answers, setAnswers] = useState<string[]>([]);

  let fontSize = isPlatform("ios") ? "90%" : "20px";

  const handleInputChange = (e: any, index: number) => {
    const newAnswers = [...answers];
    newAnswers[index] = e.target.value;
    setAnswers(newAnswers);
  };

  let inputList = questions
    ? questions.map((q, index) => {
        let required = q.required;
        let requiredHint = required ? (
          <span
            style={{
              color: "var(--ion-color-primary)",
              marginLeft: "3px",
              fontWeight: "bold",
            }}
          >
            *
          </span>
        ) : null;
        return (
          <IonItem>
            <IonLabel position="stacked" style={{ fontSize: fontSize }}>
              {q.question}
              {requiredHint}
            </IonLabel>
            <IonTextarea
              required={required}
              rows={1}
              autoGrow={true}
              onIonChange={(e) => handleInputChange(e, index)}
            />
          </IonItem>
        );
      })
    : null;

  let departmentSelect;
  if (applicationInfo.appointDepartment) {
    let selectionOptions = departments.map((department) => (
      <IonSelectOption key={department.id} value={department}>
        {department.name}
      </IonSelectOption>
    ));
    departmentSelect = (
      <IonItem>
        <IonLabel style={{ fontSize: "90%" }}> 希望加入的部门 </IonLabel>
        <IonSelect
          className="department-select"
          interface="popover"
          interfaceOptions={options}
          placeholder="请选择"
          value={selectedDepartment}
          onIonChange={(e) => {
            setSelectedDepartment(e.detail.value);
          }}
        >
          {selectionOptions}
        </IonSelect>
      </IonItem>
    );
  } else {
    departmentSelect = null;
  }

  return (
    <form
      onSubmit={
        (event) => {
          console.log({
            orgId: detail.id,
            departmentId: selectedDepartment.id,
            applicationForm: answers.map((answer, index) => ({
              question: questions[index].question,
              answer: answer,
            })),
          });
          history.go(-1);
          event.preventDefault();
        }
        //   applyToOrg({
        //     orgId: detail.id,
        //     departmentId: selectedDepartment.id,
        //     applicationForm: answers.map((answer, index) => ({question: questions[index].question, answer: answer}))
        //   }).then(r =>
        //       history.go(-1)
        //       event.preventDefault()
        //       )
      }
    >
      <IonList style={{ lineHeight: fontSize }}>
        <IonItem>
          <IonLabel position="stacked" style={{ fontSize: fontSize }}>
            您的姓名
            <span
              style={{
                color: "var(--ion-color-primary)",
                marginLeft: "3px",
                fontWeight: "bold",
              }}
            >
              *
            </span>
          </IonLabel>
          <IonInput
            required={true}
            value={name}
            onIonChange={(e) => setName(e.detail.value!)}
          />
        </IonItem>
        {inputList}
        {departmentSelect}
      </IonList>
      <IonButton style={{ margin: "25px 15px" }} expand="block" type="submit">
        确认
      </IonButton>
    </form>
  );
};
