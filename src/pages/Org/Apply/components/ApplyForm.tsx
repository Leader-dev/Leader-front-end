import * as React from "react";
import {
  IonInput,
  IonItem,
  IonLabel,
  IonList,
  IonSelect,
  IonSelectOption,
  IonTextarea,
  isPlatform,
  useIonRouter,
} from "@ionic/react";
import { OrgDetailsResult } from "@/types/organization";
import { useState } from "react";
import "./ApplyForm.css";
import { applyToOrg } from "@/services/org/apply/send";
import { OrgDepartment } from "@/types/organization";
import BottomConfirm from "@/components/BottomConfirm";
import { useToast } from "@/utils/toast";

const options = {
  cssClass: "department-select-option",
};

export default ({
  details,
  departments,
}: {
  details: OrgDetailsResult;
  departments: OrgDepartment[];
}) => {
  const history = useIonRouter();

  const { detail } = details;
  const applicationInfo = detail.applicationScheme;

  const [name, setName] = useState<string>();
  const [selectedDepartment, setSelectedDepartment] =
    useState<OrgDepartment | null>(null);
  const questions = applicationInfo.questions;
  const [answers, setAnswers] = useState<string[]>(
    questions ? Array(questions.length).fill(null) : []
  );

  let fontSize = isPlatform("ios") ? "90%" : "20px";

  const handleInputChange = (e: any, index: number) => {
    const newAnswers = [...answers];
    newAnswers[index] = e.target.value;
    setAnswers(newAnswers);
  };

  const [present] = useToast();

  return (
    <form
      onSubmit={(event) => {
        event.preventDefault();
        if (!selectedDepartment && applicationInfo.appointDepartment) {
          present({ message: "请选择部门" });
        } else {
          applyToOrg({
            orgId: detail.id,
            name: name!,
            departmentId: selectedDepartment?.id || null,
            applicationForm: questions
              ? questions.map((question, index) => ({
                  question: question.question,
                  answer: answers[index],
                }))
              : [],
          });
          history.goBack();
        }
      }}
    >
      <IonList>
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
        {questions
          ? questions.map((q, index) => (
              <IonItem>
                <IonLabel position="stacked" style={{ fontSize: fontSize }}>
                  {q.question}
                  {q.required ? (
                    <span
                      style={{
                        color: "var(--ion-color-primary)",
                        marginLeft: "3px",
                        fontWeight: "bold",
                      }}
                    >
                      *
                    </span>
                  ) : null}
                </IonLabel>
                <IonTextarea
                  required={q.required}
                  rows={1}
                  autoGrow={true}
                  onIonChange={(e) => handleInputChange(e, index)}
                />
              </IonItem>
            ))
          : null}

        {applicationInfo.appointDepartment ? (
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
              {departments.map((department) => (
                <IonSelectOption key={department.id} value={department}>
                  {department.name}
                </IonSelectOption>
              ))}
            </IonSelect>
          </IonItem>
        ) : null}
      </IonList>
      <BottomConfirm title={"确认提交"} submit={true} />
    </form>
  );
};
