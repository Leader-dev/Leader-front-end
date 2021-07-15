import * as React from "react";
import {
  IonButton,
  IonIcon,
  IonInput,
  IonItem,
  IonItemDivider,
  IonLabel,
  IonList,
  IonSelect,
  IonSelectOption,
  IonTextarea,
} from "@ionic/react";
import { OrgDetailsResult } from "@/types/organization";
import { useState } from "react";
import "./ApplyForm.css";

const options = {
  cssClass: "department-select-option",
};

export default ({
  details,
  departments,
}: {
  details: OrgDetailsResult;
  departments: { id: string; name: string }[];
}) => {
  const { detail } = details;
  const applicationInfo = detail.applicationScheme;
  const [name, setName] = useState<string>();
  type Department = typeof departments[number];
  const [selectedDepartment, setSelectedDepartment] = useState<Department>({
    id: "",
    name: "",
  });
  const questions = applicationInfo.questions;
  const length = questions.length;
  const [answers, setAnswers] = useState(
    Array.from({ length: length }).fill("")
  );

  let inputList = [];
  for (let i = 0; i < length; i++) {
    let onChange = (e: any) => {
      answers[i] = e.target.value;
      setAnswers(answers);
      // console.log(answers);
    };

    let required = questions[i].required;
    let requiredHint = required ? (
      <span
        style={{
          color: "var(--ion-color-primary)",
          marginLeft: "3px",
          fontWeight: "bold",
        }}
      >
        *{" "}
      </span>
    ) : null;
    inputList.push(
      <IonItem>
        <IonLabel position="stacked" style={{ fontSize: "90%" }}>
          {" "}
          {questions[i].question}
          {requiredHint}{" "}
        </IonLabel>
        <IonTextarea
          style={{ lineHeight: "90%" }}
          required={required}
          rows={1}
          autoGrow={true}
          onIonChange={onChange}
        />
      </IonItem>
    );
  }

  let departmentSelect;
  if (applicationInfo.appointDepartment) {
    let selectionOptions = departments.map((department) => (
      <IonSelectOption key={department.id} value={department}>
        {" "}
        {department.name}{" "}
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
    <div>
      <IonList>
        <IonItem>
          <IonLabel position="stacked" style={{ fontSize: "90%" }}>
            您的姓名
            <span
              style={{
                color: "var(--ion-color-primary)",
                marginLeft: "3px",
                fontWeight: "bold",
              }}
            >
              *{" "}
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
      <IonButton
        style={{ margin: "25px 15px" }}
        expand="block"
        onClick={() => console.log(selectedDepartment)}
      >
        {" "}
        确认{" "}
      </IonButton>
    </div>
  );
};
