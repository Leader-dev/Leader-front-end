import { IonButton, IonIcon, IonInput, IonItem, IonNote } from "@ionic/react";
import * as React from "react";
import { checkmarkCircle, closeCircle } from "ionicons/icons";

export default ({
  questions,
  setQuestions,
}: {
  questions: { question: string; required: boolean }[];
  setQuestions: any;
}) => {
  const handleInputChange = (e: any, index: number) => {
    const newList = [...questions];
    newList[index].question = e.target.value;
    setQuestions(newList);
  };

  const handleAdd = () => {
    setQuestions([...questions, { question: "", required: true }]);
  };

  const handleRemove = (index: number) => {
    const newList = [...questions];
    newList.splice(index, 1);
    setQuestions(newList);
  };

  const handleRequired = (index: number) => {
    const newList = [...questions];
    newList[index].required = !newList[index].required;
    setQuestions(newList);
  };

  return (
    <div>
      {questions.map((item, index) => (
        <IonItem style={{ display: "flex", justifyContent: "space-between" }}>
          <IonButton
            size="small"
            color="medium"
            fill="clear"
            onClick={() => handleRemove(index)}
          >
            <IonIcon slot="icon-only" icon={closeCircle} />
          </IonButton>
          <IonInput
            required={true}
            value={item.question}
            onIonChange={(e) => {
              handleInputChange(e, index);
            }}
          />
          <IonNote slot="end">
            <IonButton
              color={item.required ? "primary" : "medium"}
              fill="clear"
              size="small"
              onClick={() => handleRequired(index)}
            >
              必填
              <IonIcon icon={checkmarkCircle} />
            </IonButton>
          </IonNote>
        </IonItem>
      ))}
      <IonButton shape="round" onClick={handleAdd} />
    </div>
  );
};
